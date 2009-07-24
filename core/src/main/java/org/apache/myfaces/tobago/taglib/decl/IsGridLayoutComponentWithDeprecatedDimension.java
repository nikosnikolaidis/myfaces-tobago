package org.apache.myfaces.tobago.taglib.decl;

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

import org.apache.myfaces.tobago.apt.annotation.TagAttribute;
import org.apache.myfaces.tobago.apt.annotation.UIComponentTagAttribute;

// XXX optimize: smarter code generator

/**
 * This interface is useful for migration. The width and height attributes can be set
 * in Tobago 1.0. With this interface it can be set for compatibility.
 *
 * @see IsGridLayoutComponent
 */
@Deprecated
public interface IsGridLayoutComponentWithDeprecatedDimension {

  /**
   *  @param columnSpan The number of horizontal cells this component should use.
   */
  @UIComponentTagAttribute(type = "java.lang.Integer", defaultValue = "1")
  void setColumnSpan(String columnSpan);

  /**
   *  @param rowSpan The number of vertical cells this component should use.
   */
  @UIComponentTagAttribute(type = "java.lang.Integer", defaultValue = "1")
  void setRowSpan(String rowSpan);

  /**
   * This value will usually be set by the layout manager.
   * @param width The width for this component.
   */
  @TagAttribute
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure")
  void setWidth(String width);

  /**
   * This value will usually be set by the layout manager.
   * @param height The height for this component.
   */
  @TagAttribute
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure")
  void setHeight(String height);

  /**
   * @param minimumWidth The minimum width for this component.
   */
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure")
  void setMinimumWidth(String minimumWidth);

  /**
   * @param minimumHeight The minimum height for this component.
   */
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure")
  void setMinimumHeight(String minimumHeight);

  /**
   * @param preferredWidth The preferred width for this component.
   */
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure")
  void setPreferredWidth(String preferredWidth);

  /**
   * @param preferredHeight The preferred height for this component.
   */
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure")
  void setPreferredHeight(String preferredHeight);

  /**
   * @param maximumWidth The maximum width for this component.
   */
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure")
  void setMaximumWidth(String maximumWidth);

  /**
   * @param maximumHeight The maximum height for this component.
   */
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure")
  void setMaximumHeight(String maximumHeight);

  /**
   * This value will usually be set by the layout manager.
   * @param left The left position value for this component.
   */
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure")
  void setLeft(String left);

  /**
   * This value will usually be set by the layout manager.
   * @param top The top position value for this component.
   */
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure")
  void setTop(String top);

  /**
   * This attribute is for internal use only.
   * @param horizontalIndex The index of the component inside its container grid in horizontal direction.
   */
  @UIComponentTagAttribute(type = "java.lang.Integer")
  void setHorizontalIndex(String horizontalIndex);

  /**
   * This attribute is for internal use only.
   * @param verticalIndex The index of the component inside its container grid in vertical direction.
   */
  @UIComponentTagAttribute(type = "java.lang.Integer")
  void setVerticalIndex(String verticalIndex);

  /**
   * This attribute is for internal use only.
   * @param display Indicates the renderer to render the element as block or inline.
   */
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Display")
  void setDisplay(String display);

  /**
   * This attribute is for internal use only.
   * TODO: this attribute es for containers only
   * @param leftOffset The left offset which is needed by some containers (e. g. a box).
   */
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure",
        defaultCode = "org.apache.myfaces.tobago.config.ThemeConfig.getMeasure("
          + "getFacesContext(), this, \"leftOffset\")")
  void setLeftOffset(String leftOffset);

  /**
   * This attribute is for internal use only.
   * TODO: this attribute es for containers only
   * @param rightOffset The right offset which is needed by some containers (e. g. a box).
   */
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure",
        defaultCode = "org.apache.myfaces.tobago.config.ThemeConfig.getMeasure("
          + "getFacesContext(), this, \"rightOffset\")")
  void setRightOffset(String rightOffset);

  /**
   * This attribute is for internal use only.
   * TODO: this attribute es for containers only
   * @param topOffset The top offset which is needed by some containers (e. g. a box).
   */
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure",
        defaultCode = "org.apache.myfaces.tobago.config.ThemeConfig.getMeasure("
          + "getFacesContext(), this, \"topOffset\")")
  void setTopOffset(String topOffset);

  /**
   * This attribute is for internal use only.
   * TODO: this attribute es for containers only
   * @param bottomOffset The bottom offset which is needed by some containers (e. g. a box).
   */
  @UIComponentTagAttribute(type = "org.apache.myfaces.tobago.layout.Measure",
        defaultCode = "org.apache.myfaces.tobago.config.ThemeConfig.getMeasure("
          + "getFacesContext(), this, \"bottomOffset\")")
  void setBottomOffset(String bottomOffset);

}
