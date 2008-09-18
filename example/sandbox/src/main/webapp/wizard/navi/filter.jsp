<%--
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
--%>

<%@ taglib uri="http://myfaces.apache.org/tobago/sandbox" prefix="tcs" %>
<%@ taglib uri="http://myfaces.apache.org/tobago/component" prefix="tc" %>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib tagdir="/WEB-INF/tags/layout" prefix="layout" %>

<layout:wizard>
  <jsp:body>

    <tcs:wizardController var="w" controller="#{controller.wizard}" title="New Filter" outcome="filter"
                          allowJumpForward="true">

      <tc:panel>
        <f:facet name="layout">
          <tc:gridLayout rows="fixed;*;fixed"/>
        </f:facet>

        <tcs:wizardTrain wizard="w" controller="#{controller.wizard}"/>

        <tc:selectOneRadio value="#{controller.filterType}" required="true">
          <tc:selectItem itemLabel="File Into" itemValue="fileInto"/>
          <tc:selectItem itemLabel="Forward" itemValue="forward"/>
        </tc:selectOneRadio>

        <tc:panel>
          <f:facet name="layout">
            <tc:gridLayout columns="*;fixed;fixed;fixed;fixed"/>
          </f:facet>

          <tc:cell/>
          <tcs:wizardPrevious wizard="w" label="Vorherige"/>
          <tcs:wizardNext wizard="w" label="Nächste" action="#{controller.createFilter}"/>
          <tcs:wizardLeave wizard="w" label="Fertig"/>
          <tcs:wizardLeave wizard="w" label="Cancel"/>

        </tc:panel>

      </tc:panel>

    </tcs:wizardController>

    <%--
    <tcs:wizardStep controller="#{controller.wizard}" var="w" title="New Filter" outcome="filter" allowJumpForward="true">

    <tcs:wizardTrain wizard="w" />

      <tc:out value="Click finish for activation."/>

    <tcs:wizardPrevious wizard="w" />
    <tcs:wizardNext wizard="w" action="#{controller.createFilter}" />
    <tcs:wizardFinish wizard="w" />
    <tcs:wizardCancel wizard="w" />

    </tcs:wizardStep>
--%>

  </jsp:body>
</layout:wizard>
