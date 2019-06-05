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

import {Listener, Phase} from "./tobago-listener";
import {DomUtils} from "./tobago-utils";

class HeaderFooter {

  static init = function (element: HTMLElement): void {

    // fixing fixed header/footer: content should not scroll behind the footer

    const body = DomUtils.selfOrQuerySelectorAll(element, "body")[0];
    const headers = DomUtils.selfOrQuerySelectorAll(element, ".fixed-top");
    const footers = DomUtils.selfOrQuerySelectorAll(element, ".fixed-bottom");

    setMargins(body, headers, footers);

    let lastMaxHeaderHeight = 0;
    let lastMaxFooterHeight = 0;

    window.addEventListener("resize", function (): void {
      const maxHeaderHeight: number = HeaderFooter.getMaxHeaderHeight(headers);
      const maxFooterHeight: number = HeaderFooter.getMaxFooterHeight(footers);

      if (maxHeaderHeight !== lastMaxHeaderHeight
          || maxFooterHeight !== lastMaxFooterHeight) {
        setMargins(body, headers, footers);

        lastMaxHeaderHeight = maxHeaderHeight;
        lastMaxFooterHeight = maxFooterHeight;
      }
    });

    function setMargins(body: HTMLElement, headers: HTMLElement[], footers: HTMLElement[]): void {
      const maxHeaderHeight = HeaderFooter.getMaxHeaderHeight(headers);
      const maxFooterHeight = HeaderFooter.getMaxFooterHeight(footers);

      if (maxHeaderHeight > 0) {
        body.style.marginTop = maxHeaderHeight + "px";
      }
      if (maxFooterHeight > 0) {
        body.style.marginBottom = maxFooterHeight + "px";
      }
    }
  };

  static getMaxHeaderHeight = function (headers: HTMLElement[]): number {
    let maxHeaderHeight = 0;
    headers.forEach(function (element: HTMLElement): void {
      const height = DomUtils.outerHeightWithMargin(element);
      if (height > maxHeaderHeight) {
        maxHeaderHeight = height;
      }
    });
    return maxHeaderHeight;
  };

  static getMaxFooterHeight = function (footers: HTMLElement[]): number {
    let maxFooterHeight = 0;
    footers.forEach(function (element: HTMLElement): void {
      const height = DomUtils.outerHeightWithMargin(element);
      if (height > maxFooterHeight) {
        maxFooterHeight = height;
      }
    });
    return maxFooterHeight;
  };

}

Listener.register(HeaderFooter.init, Phase.DOCUMENT_READY);
Listener.register(HeaderFooter.init, Phase.AFTER_UPDATE);