package org.apache.myfaces.tobago.taglib.component;

/*
 * Copyright 2002-2005 The Apache Software Foundation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import org.apache.myfaces.tobago.apt.annotation.Tag;
import org.apache.myfaces.tobago.apt.annotation.TagAttribute;
import org.apache.myfaces.tobago.apt.annotation.UIComponentTag;
import org.apache.myfaces.tobago.apt.annotation.UIComponentTagAttribute;
import org.apache.myfaces.tobago.taglib.decl.HasIdBindingAndRendered;
import org.apache.myfaces.tobago.taglib.decl.HasLabelAndAccessKey;
import org.apache.myfaces.tobago.taglib.decl.HasOnchange;
import org.apache.myfaces.tobago.taglib.decl.HasTip;
import org.apache.myfaces.tobago.taglib.decl.HasValidator;
import org.apache.myfaces.tobago.taglib.decl.HasValueChangeListener;
import org.apache.myfaces.tobago.taglib.decl.IsDisabled;
import org.apache.myfaces.tobago.taglib.decl.IsReadonly;
import org.apache.myfaces.tobago.taglib.decl.IsRequired;

/*
 * Created: Aug 5, 2005 5:15:50 PM
 * User: bommel
 * $Id: $
 */
/**
 * Renders a file input field.
 */
@Tag(name = "file")
@UIComponentTag(
    uiComponent = "org.apache.myfaces.tobago.component.UIFileInput",
    rendererType = "File")
public interface FileTagDeclaration
    extends BeanTagDeclaration, HasValidator, HasOnchange, HasValueChangeListener, HasIdBindingAndRendered, IsDisabled,
    HasLabelAndAccessKey, HasTip, IsReadonly, IsRequired {

  /**
   * Value binding expression pointing to a
   * <code>org.apache.commons.fileupload.FileItem</code> property to store the
   * uploaded file.
   */
  @TagAttribute
  @UIComponentTagAttribute(type = { "org.apache.commons.fileupload.FileItem" })
  void setValue(String value);
}
