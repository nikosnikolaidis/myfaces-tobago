package org.apache.myfaces.tobago.lifecycle;

/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.myfaces.tobago.portlet.PortletUtils;
import org.apache.myfaces.tobago.util.ComponentUtils;

import javax.faces.FacesException;
import javax.faces.application.Application;
import javax.faces.application.FacesMessage;
import javax.faces.application.ViewHandler;
import javax.faces.component.UIComponent;
import javax.faces.component.UIInput;
import javax.faces.component.UIViewRoot;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.faces.el.ValueBinding;
import javax.faces.event.PhaseId;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import static org.apache.myfaces.tobago.lifecycle.TobagoLifecycle.FACES_MESSAGES_KEY;
import static org.apache.myfaces.tobago.lifecycle.TobagoLifecycle.VIEW_ROOT_KEY;

/**
 * Implements the life cycle as described in Spec. 1.0 PFD Chapter 2
 * <p/>
 * Restore view phase (JSF Spec 2.2.1)
 */
class RestoreViewExecutor implements PhaseExecutor {

  private static final Log LOG = LogFactory.getLog(RestoreViewExecutor.class);

  public boolean execute(FacesContext facesContext) {
    ExternalContext externalContext = facesContext.getExternalContext();

    Map sessionMap = externalContext.getSessionMap();
    UIViewRoot viewRoot = (UIViewRoot) sessionMap.get(VIEW_ROOT_KEY);
    if (viewRoot != null) {
      facesContext.setViewRoot(viewRoot);
      sessionMap.remove(VIEW_ROOT_KEY);
      //noinspection unchecked
      List<Object[]> messageHolders
          = (List<Object[]>) sessionMap.get(FACES_MESSAGES_KEY);
      if (messageHolders != null) {
        for (Object[] messageHolder : messageHolders) {
          facesContext.addMessage((String) messageHolder[0], (FacesMessage) messageHolder[1]);
        }
      }
      sessionMap.remove(FACES_MESSAGES_KEY);
      facesContext.renderResponse();
      return true;
    }

    if (facesContext.getViewRoot() != null) {
      facesContext.getViewRoot().setLocale(facesContext.getExternalContext().getRequestLocale());
      ComponentUtils.resetPage(facesContext);
      recursivelyHandleComponentReferencesAndSetValid(facesContext, facesContext.getViewRoot());
      return false;
    }

    // Derive view identifier
    String viewId = deriveViewId(facesContext);

    if (viewId == null) {

      if (externalContext.getRequestServletPath() == null) {
        return true;
      }

      if (!externalContext.getRequestServletPath().endsWith("/")) {
        try {
          externalContext.redirect(externalContext.getRequestServletPath() + "/");
          facesContext.responseComplete();
          return true;
        } catch (IOException e) {
          throw new FacesException("redirect failed", e);
        }
      }
    }

    Application application = facesContext.getApplication();
    ViewHandler viewHandler = application.getViewHandler();

    // boolean viewCreated = false;
    viewRoot = viewHandler.restoreView(facesContext, viewId);
    if (viewRoot == null) {
      viewRoot = viewHandler.createView(facesContext, viewId);
      viewRoot.setViewId(viewId);
      facesContext.renderResponse();
      // viewCreated = true;
    }

    facesContext.setViewRoot(viewRoot);
    ComponentUtils.resetPage(facesContext);

    if (facesContext.getExternalContext().getRequestParameterMap().isEmpty()) {
      // no POST or query parameters --> set render response flag
      facesContext.renderResponse();
    }

    recursivelyHandleComponentReferencesAndSetValid(facesContext, viewRoot);
    //noinspection unchecked
    facesContext.getExternalContext().getRequestMap().put(VIEW_ROOT_KEY, viewRoot);
    return false;
  }

  public PhaseId getPhase() {
    return PhaseId.RESTORE_VIEW;
  }

  private static String deriveViewId(FacesContext facesContext) {
    ExternalContext externalContext = facesContext.getExternalContext();

    if (PortletUtils.isPortletRequest(facesContext)) {
      return PortletUtils.getViewId(facesContext);
    }

    String viewId = externalContext.getRequestPathInfo(); // getPathInfo
    if (viewId == null) {
      // No extra path info found, so it is propably extension mapping
      viewId = externalContext.getRequestServletPath(); // getServletPath
      if (viewId == null) {
        String msg = "RequestServletPath is null, cannot determine viewId of current page.";
        LOG.error(msg);
        throw new FacesException(msg);
      }

      // TODO: JSF Spec 2.2.1 - what do they mean by "if the default
      // ViewHandler implementation is used..." ?
      String defaultSuffix = externalContext.getInitParameter(ViewHandler.DEFAULT_SUFFIX_PARAM_NAME);
      String suffix = defaultSuffix != null ? defaultSuffix : ViewHandler.DEFAULT_SUFFIX;
      if (suffix.charAt(0) != '.') {
        String msg = "Default suffix must start with a dot!";
        LOG.error(msg);
        throw new FacesException(msg);
      }

      int dot = viewId.lastIndexOf('.');
      if (dot == -1) {
        LOG.error("Assumed extension mapping, but there is no extension in " + viewId);
        viewId = null;
      } else {
        viewId = viewId.substring(0, dot) + suffix;
      }
    }

    return viewId;
  }

  // next two methods are taken from 'org.apache.myfaces.shared.util.RestoreStateUtils'

  public static void recursivelyHandleComponentReferencesAndSetValid(FacesContext facesContext,
      UIComponent parent) {
    boolean forceHandle = false;

    Method handleBindingsMethod = getBindingMethod(parent);

    if (handleBindingsMethod != null && !forceHandle) {
      try {
        handleBindingsMethod.invoke(parent, new Object[]{});
      } catch (Throwable th) {
        LOG.error("Exception while invoking handleBindings on component with client-id:"
            + parent.getClientId(facesContext), th);
      }
    } else {
      for (Iterator it = parent.getFacetsAndChildren(); it.hasNext();) {
        UIComponent component = (UIComponent) it.next();

        ValueBinding binding = component.getValueBinding("binding");    //TODO: constant
        if (binding != null && !binding.isReadOnly(facesContext)) {
          binding.setValue(facesContext, component);
        }

        if (component instanceof UIInput) {
          ((UIInput) component).setValid(true);
        }

        recursivelyHandleComponentReferencesAndSetValid(facesContext, component);
      }
    }
  }

  /**
   * This is all a hack to work around a spec-bug which will be fixed in JSF2.0
   *
   * @param parent
   * @return true if this component is bindingAware (e.g. aliasBean)
   */
  private static Method getBindingMethod(UIComponent parent) {
    Class[] clazzes = parent.getClass().getInterfaces();

    for (Class clazz : clazzes) {
      if (clazz.getName().indexOf("BindingAware") != -1) {
        try {
          return parent.getClass().getMethod("handleBindings", new Class[]{});
        } catch (NoSuchMethodException e) {
          // return
        }
      }
    }

    return null;
  }

}
