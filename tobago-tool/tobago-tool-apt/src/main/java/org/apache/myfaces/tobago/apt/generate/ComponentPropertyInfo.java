package org.apache.myfaces.tobago.apt.generate;

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

public class ComponentPropertyInfo extends PropertyInfo {
  private int index;
  private boolean elAlternativeAvailable;

  public String getPropertyTemplate() {
    return getShortTypeProperty() + "Property";
  }

  public String getPropertySaveStateTemplate() {
    return getShortTypeProperty() + "SaveStateProperty";
  }

  public String getPropertyRestoreStateTemplate() {
    return getShortTypeProperty() + "RestoreStateProperty";
  }

  public int getIndex() {
    return index;
  }

  public void setIndex(int index) {
    this.index = index;
  }

  public int getIndexPlusOne() {
    return index + 1;
  }

  public boolean isElAlternativeAvailable() {
    return elAlternativeAvailable;
  }

  public void setElAlternativeAvailable(boolean elAlternativeAvailable) {
    this.elAlternativeAvailable = elAlternativeAvailable;
  }
}
