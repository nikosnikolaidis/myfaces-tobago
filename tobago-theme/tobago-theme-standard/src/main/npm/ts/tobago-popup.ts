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

import {BootstrapUtils} from "./ext-bootstrap";

export class Popup extends HTMLElement {

  static close(button: HTMLElement): void {
    BootstrapUtils.modal(button.closest(".modal"), "hide");
  }

  constructor() {
    super();
  }

  connectedCallback(): void {
    const hidden = Collapse.findHidden(this);
    if (hidden.value === "false") {
      // XXX hack: this is needed for popups open by AJAX.
      // XXX currently the DOM replacement done by Tobago doesn't remove the modal-backdrop
      for (const backdrop of document.querySelectorAll(".modal-backdrop")) {
        backdrop.parentNode.removeChild(backdrop);
      }

      BootstrapUtils.modal(this, "show"); // inits and opens the popup
    } else {
      BootstrapUtils.modal(this, "hide"); // inits and hides the popup
    }
  }
}

document.addEventListener("DOMContentLoaded", function (event: Event): void {
  window.customElements.define("tobago-popup", Popup);
});

export class Collapse {

  static findHidden(element: HTMLElement): HTMLInputElement {
    return document.getElementById(element.id + "::collapse") as HTMLInputElement;
  }

  static execute = function (action: string, target: HTMLElement): void {
    const hidden = Collapse.findHidden(target);
    const isPopup = target.tagName === "TOBAGO-POPUP";
    let newCollapsed;
    switch (action) {
      case "hide":
        newCollapsed = true;
        break;
      case "show":
        newCollapsed = false;
        break;
      default:
        console.error("unknown action: '" + action + "'");
    }
    if (newCollapsed) {
      if (isPopup) {
        BootstrapUtils.modal(target, "hide");
      } else {
        target.classList.add("tobago-collapsed");
      }
    } else {
      if (isPopup) {
        BootstrapUtils.modal(target, "show");
      } else {
        target.classList.remove("tobago-collapsed");
      }
    }
    hidden.value = newCollapsed;
  };
}