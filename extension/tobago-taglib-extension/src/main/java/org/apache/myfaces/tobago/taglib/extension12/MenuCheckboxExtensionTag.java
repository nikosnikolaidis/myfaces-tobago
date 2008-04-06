package org.apache.myfaces.tobago.taglib.extension12;

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

import org.apache.myfaces.tobago.apt.annotation.ExtensionTag;
import org.apache.myfaces.tobago.apt.annotation.Tag;
import org.apache.myfaces.tobago.apt.annotation.TagAttribute;
import org.apache.myfaces.tobago.apt.annotation.UIComponentTagAttribute;
import org.apache.myfaces.tobago.apt.annotation.DynamicExpression;
import org.apache.myfaces.tobago.internal.taglib.SelectBooleanCheckboxTag;
import org.apache.myfaces.tobago.internal.taglib.MenuItemTag;

import javax.faces.webapp.FacetTag;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyTagSupport;
import javax.el.MethodExpression;

/*
 * Date: 09.05.2006
 * Time: 00:00:49
 */

/**
 * Renders a checkable menuitem.
 */

@Tag(name = "menuCheckbox", tagExtraInfoClassName = "org.apache.myfaces.tobago.taglib.component.CommandTagExtraInfo")
@ExtensionTag(baseClassName = "org.apache.myfaces.tobago.taglib.component.MenuCheckboxTag")
public class MenuCheckboxExtensionTag extends BodyTagSupport {
  private javax.el.ValueExpression rendered;
  private javax.el.ValueExpression value;

  private MenuItemTag menuCommandTag;
  private SelectBooleanCheckboxTag selectBooleanCheckbox;
  private FacetTag facetTag;
  private javax.el.MethodExpression action;
  private javax.el.MethodExpression actionListener;
  private javax.el.ValueExpression onclick;
  private javax.el.ValueExpression link;
  private javax.el.ValueExpression disabled;
  private javax.el.ValueExpression binding;
  private javax.el.ValueExpression label;
  private javax.el.ValueExpression immediate;
  private javax.el.ValueExpression transition;
  private javax.el.ValueExpression renderedPartially;

  @Override
  public int doStartTag() throws JspException {

    menuCommandTag = new MenuItemTag();
    menuCommandTag.setPageContext(pageContext);
    menuCommandTag.setParent(getParent()); // ???
    if (rendered != null) {
      menuCommandTag.setRendered(rendered);
    }
    if (action != null) {
      menuCommandTag.setAction(action);
    }
    if (actionListener != null) {
      menuCommandTag.setActionListener(actionListener);
    }
    if (onclick != null) {
      menuCommandTag.setOnclick(onclick);
    }
    if (link != null) {
      menuCommandTag.setLink(link);
    }
    if (disabled != null) {
      menuCommandTag.setDisabled(disabled);
    }
    if (binding != null) {
      menuCommandTag.setBinding(binding);
    }
    if (label != null) {
      menuCommandTag.setLabel(label);
    }
    if (immediate != null) {
      menuCommandTag.setImmediate(immediate);
    }
    if (transition != null) {
      menuCommandTag.setTransition(transition);
    }
    if (renderedPartially != null) {
      menuCommandTag.setRenderedPartially(renderedPartially);
    }
    menuCommandTag.doStartTag();

    facetTag = new FacetTag();
    facetTag.setPageContext(pageContext);
    facetTag.setParent(menuCommandTag);
    facetTag.setName(org.apache.myfaces.tobago.TobagoConstants.FACET_ITEMS);

    facetTag.doStartTag();
    selectBooleanCheckbox = new SelectBooleanCheckboxTag();
    selectBooleanCheckbox.setPageContext(pageContext);
    if (value != null) {
      selectBooleanCheckbox.setValue(value);
    }
    selectBooleanCheckbox.setParent(facetTag);
    selectBooleanCheckbox.doStartTag();
    return super.doStartTag();
  }

  @Override
  public int doEndTag() throws JspException {
    selectBooleanCheckbox.doEndTag();
    facetTag.doEndTag();
    menuCommandTag.doEndTag();
    return super.doEndTag();
  }

  /**
   * Action to invoke when clicked.
   * This must be a MethodBinding or a String representing the application action to invoke when
   * this component is activated by the user.
   * The MethodBinding must evaluate to a public method that takes no parameters,
   * and returns a String (the logical outcome) which is passed to the
   * NavigationHandler for this application.
   * The String is directly passed to the Navigationhandler.
   */
  @TagAttribute
  @UIComponentTagAttribute(type = {}, expression = DynamicExpression.METHOD_BINDING,
      methodReturnType = "java.lang.Object")
  public void setAction(MethodExpression action) {
    this.action = action;
  }

  /**
   * MethodBinding representing an action listener method that will be
   * notified when this component is activated by the user.
   * The expression must evaluate to a public method that takes an ActionEvent
   * parameter, with a return type of void.
   */
  @TagAttribute
  @UIComponentTagAttribute(type = {}, expression = DynamicExpression.METHOD_BINDING_REQUIRED,
      methodSignature = "javax.faces.event.ActionEvent")
  public void setActionListener(javax.el.MethodExpression actionListener) {
    this.actionListener = actionListener;
  }

  /**
   * Script to be invoked when clicked
   *
   * @param onclick
   */
  @TagAttribute
  @UIComponentTagAttribute()
  public void setOnclick(javax.el.ValueExpression onclick) {
    this.onclick = onclick;
  }

  /**
   * Link to an arbitrary URL
   *
   * @param link
   */
  @TagAttribute
  @UIComponentTagAttribute()
  public void setLink(javax.el.ValueExpression link) {
    this.link = link;
  }

  /**
   * The value binding expression linking this
   * component to a property in a backing bean.
   */
  @TagAttribute
  @UIComponentTagAttribute(type = "javax.faces.component.UIComponent")
  public void setBinding(javax.el.ValueExpression binding) throws JspException {
    this.binding = binding;
  }

  /**
   * Flag indicating whether or not this component should be rendered
   * (during Render Response Phase), or processed on any subsequent form submit.
   */
  @TagAttribute
  @UIComponentTagAttribute(type = "java.lang.Boolean", defaultValue = "true")
  public void setRendered(javax.el.ValueExpression rendered) {
    this.rendered = rendered;
  }

  /**
   * Flag indicating that this element is disabled.
   */
  @TagAttribute(type = String.class)
  @UIComponentTagAttribute(type = "java.lang.Boolean", defaultValue = "false")
  public void setDisabled(javax.el.ValueExpression disabled) {
    this.disabled = disabled;
  }

  /**
   * The current value of this component.
   */
  @TagAttribute
  @UIComponentTagAttribute(type = "java.lang.Object")
  public void setValue(javax.el.ValueExpression value) {
    this.value = value;
  }

  /**
   * Text value to display as label.
   * If text contains an underscore the next character is used as accesskey.
   */
  @TagAttribute
  @UIComponentTagAttribute()
  public void setLabel(javax.el.ValueExpression label) {
    this.label = label;
  }

  /**
   * Flag indicating that, if this component is activated by the user,
   * notifications should be delivered to interested listeners and actions
   * immediately (that is, during Apply Request Values phase) rather than
   * waiting until Invoke Application phase.
   */
  @TagAttribute
  @UIComponentTagAttribute(type = "java.lang.Boolean", defaultValue = "false")
  public void setImmediate(javax.el.ValueExpression immediate) {
    this.immediate = immediate;
  }

  /**
   * Specify, if the command calls an JSF-Action.
   * Useful to switch off the Double-Submit-Check and Waiting-Behavior.
   *
   * @param transition Indicates the transition.
   */
  @TagAttribute
  @UIComponentTagAttribute(type = "java.lang.Boolean", defaultValue = "true")
  public void setTransition(javax.el.ValueExpression transition) {
    this.transition = transition;
  }

  /**
   * Indicate the partially rendered Components in a case of a submit.
   */
   @TagAttribute
   @UIComponentTagAttribute(type = "java.lang.String[]")
  public void setRenderedPartially(javax.el.ValueExpression renderedPartially) {
    this.renderedPartially = renderedPartially;
  }

  public void release() {
    super.release();
    rendered = null;
    value = null;
    action = null;
    actionListener = null;
    onclick = null;
    link = null;
    disabled = null;
    binding = null;
    label = null;
    immediate = null;
    transition = null;
    renderedPartially = null;
    menuCommandTag = null;
    facetTag = null;
    selectBooleanCheckbox = null;
  }
}