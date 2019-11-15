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

import {testFrameQuerySelectorAllFn, testFrameQuerySelectorFn} from "/script/tobago-test.js";
import {TobagoTestTool} from "/tobago/test/tobago-test-tool.js";

QUnit.test("Basics: Name", function (assert) {
  let colNameFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s1\\:columnName_sorter");
  let rowsFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s1 .tobago-sheet-bodyTable tbody .tobago-sheet-row");
  let leftPagingFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s1 .tobago-sheet-paging-markup-left input");

  let TTT = new TobagoTestTool(assert);
  if (!colNameFn().classList.contains("tobago-sheet-header-markup-ascending")) {
    TTT.action(function () {
      colNameFn().dispatchEvent(new Event("click", {bubbles: true}));
    });
    TTT.waitForResponse();
  }
  TTT.asserts(3, function () {
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-sortable"));
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-ascending"));
    assert.notOk(colNameFn().classList.contains("tobago-sheet-header-markup-descending"));
  });
  TTT.action(function () {
    leftPagingFn().value = "22";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Earth", "365.26", "",
        "Elara", "259.65", "1905",
        "Enceladus", "1.37", "1789",
        "Epimetheus", "0.69", "1980");
  });
  TTT.action(function () {
    colNameFn().dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Proteus", "1.12", "1989",
        "Prospero", "-1962.95", "1999",
        "Prometheus", "0.61", "1980",
        "Praxidike", "625.3", "2000");
  });
  TTT.action(function () {
    colNameFn().dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Earth", "365.26", "",
        "Elara", "259.65", "1905",
        "Enceladus", "1.37", "1789",
        "Epimetheus", "0.69", "1980");
  });
  TTT.startTest();
});

QUnit.test("Basics: Period", function (assert) {
  let colPeriodFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s1\\:columnPeriod_sorter");
  let rowsFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s1 .tobago-sheet-bodyTable tbody .tobago-sheet-row");
  let leftPagingFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s1 .tobago-sheet-paging-markup-left input");

  let TTT = new TobagoTestTool(assert);
  if (!colPeriodFn().classList.contains("tobago-sheet-header-markup-ascending")) {
    TTT.action(function () {
      colPeriodFn().dispatchEvent(new Event("click", {bubbles: true}));
    });
    TTT.waitForResponse();
  }
  TTT.asserts(3, function () {
    assert.ok(colPeriodFn().classList.contains("tobago-sheet-header-markup-sortable"));
    assert.ok(colPeriodFn().classList.contains("tobago-sheet-header-markup-ascending"));
    assert.notOk(colPeriodFn().classList.contains("tobago-sheet-header-markup-descending"));
  });
  TTT.action(function () {
    leftPagingFn().value = "29";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Rosalind", "0.56", "1986",
        "Pan", "0.58", "1990",
        "Atlas", "0.6", "1980",
        "Prometheus", "0.61", "1980");
  });
  TTT.action(function () {
    colPeriodFn().dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Callisto", "16.69", "1610",
        "Titan", "15.95", "1655",
        "Oberon", "13.46", "1787",
        "Titania", "8.71", "1787");
  });
  TTT.action(function () {
    colPeriodFn().dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Rosalind", "0.56", "1986",
        "Pan", "0.58", "1990",
        "Atlas", "0.6", "1980",
        "Prometheus", "0.61", "1980");
  });
  TTT.startTest();
});

QUnit.test("Basics: Year", function (assert) {
  let colYearFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s1\\:columnDiscoverYear_sorter");
  let rowsFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s1 .tobago-sheet-bodyTable tbody .tobago-sheet-row");
  let leftPagingFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s1 .tobago-sheet-paging-markup-left input");

  let TTT = new TobagoTestTool(assert);
  if (!colYearFn().classList.contains("tobago-sheet-header-markup-ascending")) {
    TTT.action(function () {
      colYearFn().dispatchEvent(new Event("click", {bubbles: true}));
    });
    TTT.waitForResponse();
  }
  TTT.asserts(3, function () {
    assert.ok(colYearFn().classList.contains("tobago-sheet-header-markup-sortable"));
    assert.ok(colYearFn().classList.contains("tobago-sheet-header-markup-ascending"));
    assert.notOk(colYearFn().classList.contains("tobago-sheet-header-markup-descending"));
  });
  TTT.action(function () {
    leftPagingFn().value = "22";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(4, function () {
    assert.equal(rowsFn().item(0).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1892", "row0col2");
    assert.equal(rowsFn().item(1).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1898", "row1col2");
    assert.equal(rowsFn().item(2).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1904", "row2col2");
    assert.equal(rowsFn().item(3).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1905", "row3col2");
  });
  TTT.action(function () {
    colYearFn().dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(4, function () {
    assert.equal(rowsFn().item(0).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1999", "row0col2");
    assert.equal(rowsFn().item(1).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1999", "row1col2");
    assert.equal(rowsFn().item(2).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1997", "row2col2");
    assert.equal(rowsFn().item(3).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1997", "row3col2");
  });
  TTT.action(function () {
    colYearFn().dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(4, function () {
    assert.equal(rowsFn().item(0).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1892", "row0col2");
    assert.equal(rowsFn().item(1).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1898", "row1col2");
    assert.equal(rowsFn().item(2).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1904", "row2col2");
    assert.equal(rowsFn().item(3).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1905", "row3col2");
  });
  TTT.startTest();
});

/**
 * 1. goto line 8
 * 2. goto line 9
 */
QUnit.test("Basics: left paging", function (assert) {
  let colNameFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s1\\:columnName_sorter");
  let rowsFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s1 .tobago-sheet-bodyTable tbody .tobago-sheet-row");
  let leftPagingFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s1 .tobago-sheet-paging-markup-left input");

  let TTT = new TobagoTestTool(assert);
  if (!colNameFn().classList.contains("tobago-sheet-header-markup-ascending")) {
    TTT.action(function () {
      colNameFn().dispatchEvent(new Event("click", {bubbles: true}));
    });
    TTT.waitForResponse();
  }
  TTT.asserts(3, function () {
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-sortable"));
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-ascending"));
    assert.notOk(colNameFn().classList.contains("tobago-sheet-header-markup-descending"));
  });
  TTT.action(function () {
    leftPagingFn().value = "8";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Bianca", "0.43", "1986",
        "Caliban", "-579.39", "1997",
        "Callirrhoe", "758.8", "2000",
        "Callisto", "16.69", "1610");
  });
  TTT.action(function () {
    leftPagingFn().value = "9";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Caliban", "-579.39", "1997",
        "Callirrhoe", "758.8", "2000",
        "Callisto", "16.69", "1610",
        "Calypso", "1.89", "1980");
  });
  TTT.startTest();
});

/**
 * 1. goto page 7
 * 2. goto page 16
 * 3. goto page 13
 */
QUnit.test("Basics: center paging", function (assert) {
  let colNameFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s1\\:columnName_sorter");
  let rowsFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s1 .tobago-sheet-bodyTable tbody .tobago-sheet-row");
  let leftPagingFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s1 .tobago-sheet-paging-markup-left input");
  let centerPagingFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s1 .tobago-sheet-paging-markup-center li .page-link");

  let TTT = new TobagoTestTool(assert);
  if (!colNameFn().classList.contains("tobago-sheet-header-markup-ascending")) {
    TTT.action(function () {
      colNameFn().dispatchEvent(new Event("click", {bubbles: true}));
    });
    TTT.waitForResponse();
  }
  TTT.asserts(3, function () {
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-sortable"));
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-ascending"));
    assert.notOk(colNameFn().classList.contains("tobago-sheet-header-markup-descending"));
  });
  TTT.action(function () {
    leftPagingFn().value = "1";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "1986U10", "0.64", "1999",
        "Adrastea", "0.3", "1979",
        "Amalthea", "0.5", "1892",
        "Ananke", "-629.77", "1951");
  });
  TTT.action(function () {
    centerPagingFn().item(6).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Epimetheus", "0.69", "1980",
        "Erinome", "728.3", "2000",
        "Europa", "3.55", "1610",
        "Galatea", "0.43", "1989");
  });
  TTT.action(function () {
    centerPagingFn().item(10).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Phoebe", "-550.48", "1898",
        "Pluto", "90800.0", "1930",
        "Portia", "0.51", "1986",
        "Praxidike", "625.3", "2000");
  });
  TTT.action(function () {
    centerPagingFn().item(3).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Neptune", "60190.0", "1846",
        "Nereid", "360.13", "1949",
        "Oberon", "13.46", "1787",
        "Ophelia", "0.38", "1986");
  });
  TTT.startTest();
});

/**
 * 1. goto first page
 * 2. goto page 2 by pressing arrow-right
 * 3. goto last page
 * 4. goto page 21 by pressing arrow-left
 * 5. goto page 14
 */
QUnit.test("Basics: right paging", function (assert) {
  let colNameFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s1\\:columnName_sorter");
  let rowsFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s1 .tobago-sheet-bodyTable tbody .tobago-sheet-row");
  let leftPagingFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s1 .tobago-sheet-paging-markup-left input");
  let rightPagingFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s1 .tobago-sheet-paging-markup-right .page-link");
  let jumpToPageFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s1 .tobago-sheet-paging-markup-right .page-link input");

  let TTT = new TobagoTestTool(assert);
  if (!colNameFn().classList.contains("tobago-sheet-header-markup-ascending")) {
    TTT.action(function () {
      colNameFn().dispatchEvent(new Event("click", {bubbles: true}));
    });
    TTT.waitForResponse();
  }
  TTT.asserts(3, function () {
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-sortable"));
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-ascending"));
    assert.notOk(colNameFn().classList.contains("tobago-sheet-header-markup-descending"));
  });
  TTT.action(function () {
    leftPagingFn().value = "22";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Earth", "365.26", "",
        "Elara", "259.65", "1905",
        "Enceladus", "1.37", "1789",
        "Epimetheus", "0.69", "1980");
  });
  TTT.action(function () {
    rightPagingFn().item(0).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "1986U10", "0.64", "1999",
        "Adrastea", "0.3", "1979",
        "Amalthea", "0.5", "1892",
        "Ananke", "-629.77", "1951");
  });
  TTT.action(function () {
    rightPagingFn().item(3).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Ariel", "2.52", "1851",
        "Atlas", "0.6", "1980",
        "Belinda", "0.62", "1986",
        "Bianca", "0.43", "1986");
  });
  TTT.action(function () {
    rightPagingFn().item(4).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Triton", "-5.88", "1846",
        "Umbriel", "4.14", "1851",
        "Uranus", "30685.0", "1781",
        "Venus", "224.7", "");
  });
  TTT.action(function () {
    rightPagingFn().item(1).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Thebe", "0.67", "1979",
        "Themisto", "130.02", "2000",
        "Titan", "15.95", "1655",
        "Titania", "8.71", "1787");
  });
  TTT.action(function () {
    jumpToPageFn().value = "14";
    jumpToPageFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Neptune", "60190.0", "1846",
        "Nereid", "360.13", "1949",
        "Oberon", "13.46", "1787",
        "Ophelia", "0.38", "1986");
  });
  TTT.startTest();
});

QUnit.test("Custom Sorting: Name", function (assert) {
  let colNameFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s2\\:customColumnName_sorter");
  let rowsFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s2 .tobago-sheet-bodyTable tbody .tobago-sheet-row");
  let leftPagingFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s2 .tobago-sheet-paging-markup-left input");

  let TTT = new TobagoTestTool(assert);
  if (!colNameFn().classList.contains("tobago-sheet-header-markup-ascending")) {
    TTT.action(function () {
      colNameFn().dispatchEvent(new Event("click", {bubbles: true}));
    });
    TTT.waitForResponse();
  }
  TTT.asserts(3, function () {
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-sortable"));
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-ascending"));
    assert.notOk(colNameFn().classList.contains("tobago-sheet-header-markup-descending"));
  });
  TTT.action(function () {
    leftPagingFn().value = "22";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Earth", "365.26", "",
        "Elara", "259.65", "1905",
        "Enceladus", "1.37", "1789",
        "Epimetheus", "0.69", "1980");
  });
  TTT.action(function () {
    colNameFn().dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Proteus", "1.12", "1989",
        "Prospero", "-1962.95", "1999",
        "Prometheus", "0.61", "1980",
        "Praxidike", "625.3", "2000");
  });
  TTT.action(function () {
    colNameFn().dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Earth", "365.26", "",
        "Elara", "259.65", "1905",
        "Enceladus", "1.37", "1789",
        "Epimetheus", "0.69", "1980");
  });
  TTT.startTest();
});

QUnit.test("Custom Sorting: Period", function (assert) {
  let colPeriodFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s2\\:customColumnPeriod_sorter");
  let rowsFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s2 .tobago-sheet-bodyTable tbody .tobago-sheet-row");
  let leftPagingFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s2 .tobago-sheet-paging-markup-left input");

  let TTT = new TobagoTestTool(assert);
  if (!colPeriodFn().classList.contains("tobago-sheet-header-markup-ascending")) {
    TTT.action(function () {
      colPeriodFn().dispatchEvent(new Event("click", {bubbles: true}));
    });
    TTT.waitForResponse();
  }
  TTT.asserts(3, function () {
    assert.ok(colPeriodFn().classList.contains("tobago-sheet-header-markup-sortable"));
    assert.ok(colPeriodFn().classList.contains("tobago-sheet-header-markup-ascending"));
    assert.notOk(colPeriodFn().classList.contains("tobago-sheet-header-markup-descending"));
  });
  TTT.action(function () {
    leftPagingFn().value = "29";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Mimas", "0.94", "1789",
        "Proteus", "1.12", "1989",
        "Deimos", "1.26", "1877",
        "Enceladus", "1.37", "1789");
  });
  TTT.action(function () {
    colPeriodFn().dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Elara", "259.65", "1905",
        "Lysithea", "259.22", "1938",
        "Himalia", "250.57", "1904",
        "Leda", "238.72", "1974");
  });
  TTT.action(function () {
    colPeriodFn().dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Mimas", "0.94", "1789",
        "Proteus", "1.12", "1989",
        "Deimos", "1.26", "1877",
        "Enceladus", "1.37", "1789");
  });
  TTT.startTest();
});

QUnit.test("Custom Sorting: Year", function (assert) {
  let colYearFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s2\\:customColumnYear_sorter");
  let rowsFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s2 .tobago-sheet-bodyTable tbody .tobago-sheet-row");
  let leftPagingFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s2 .tobago-sheet-paging-markup-left input");

  let TTT = new TobagoTestTool(assert);
  if (!colYearFn().classList.contains("tobago-sheet-header-markup-ascending")) {
    TTT.action(function () {
      colYearFn().dispatchEvent(new Event("click", {bubbles: true}));
    });
    TTT.waitForResponse();
  }
  TTT.asserts(3, function () {
    assert.ok(colYearFn().classList.contains("tobago-sheet-header-markup-sortable"));
    assert.ok(colYearFn().classList.contains("tobago-sheet-header-markup-ascending"));
    assert.notOk(colYearFn().classList.contains("tobago-sheet-header-markup-descending"));
  });
  TTT.action(function () {
    leftPagingFn().value = "22";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(4, function () {
    assert.equal(rowsFn().item(0).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1789", "row0col2");
    assert.equal(rowsFn().item(1).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1846", "row1col2");
    assert.equal(rowsFn().item(2).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1846", "row2col2");
    assert.equal(rowsFn().item(3).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1848", "row3col2");
  });
  TTT.action(function () {
    colYearFn().dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(4, function () {
    assert.equal(rowsFn().item(0).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1989", "row0col2");
    assert.equal(rowsFn().item(1).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1989", "row1col2");
    assert.equal(rowsFn().item(2).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1989", "row2col2");
    assert.equal(rowsFn().item(3).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1986", "row3col2");
  });
  TTT.action(function () {
    colYearFn().dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(4, function () {
    assert.equal(rowsFn().item(0).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1789", "row0col2");
    assert.equal(rowsFn().item(1).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1846", "row1col2");
    assert.equal(rowsFn().item(2).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1846", "row2col2");
    assert.equal(rowsFn().item(3).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim(), "1848", "row3col2");
  });
  TTT.startTest();
});

/**
 * 1. goto line 8
 * 2. goto line 9
 */
QUnit.test("Custom Sorting: left paging", function (assert) {
  let colNameFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s2\\:customColumnName_sorter");
  let rowsFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s2 .tobago-sheet-bodyTable tbody .tobago-sheet-row");
  let leftPagingFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s2 .tobago-sheet-paging-markup-left input");

  let TTT = new TobagoTestTool(assert);
  if (!colNameFn().classList.contains("tobago-sheet-header-markup-ascending")) {
    TTT.action(function () {
      colNameFn().dispatchEvent(new Event("click", {bubbles: true}));
    });
    TTT.waitForResponse();
  }
  TTT.asserts(3, function () {
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-sortable"));
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-ascending"));
    assert.notOk(colNameFn().classList.contains("tobago-sheet-header-markup-descending"));
  });
  TTT.action(function () {
    leftPagingFn().value = "8";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Bianca", "0.43", "1986",
        "Caliban", "-579.39", "1997",
        "Callirrhoe", "758.8", "2000",
        "Callisto", "16.69", "1610");
  });
  TTT.action(function () {
    leftPagingFn().value = "9";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Caliban", "-579.39", "1997",
        "Callirrhoe", "758.8", "2000",
        "Callisto", "16.69", "1610",
        "Calypso", "1.89", "1980");
  });
  TTT.startTest();
});

/**
 * 1. goto page 7
 * 2. goto page 16
 * 3. goto page 13
 */
QUnit.test("Custom Sorting: center paging", function (assert) {
  let colNameFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s2\\:customColumnName_sorter");
  let rowsFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s2 .tobago-sheet-bodyTable tbody .tobago-sheet-row");
  let leftPagingFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s2 .tobago-sheet-paging-markup-left input");
  let centerPagingFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s2 .tobago-sheet-paging-markup-center li .page-link");

  let TTT = new TobagoTestTool(assert);
  if (!colNameFn().classList.contains("tobago-sheet-header-markup-ascending")) {
    TTT.action(function () {
      colNameFn().dispatchEvent(new Event("click", {bubbles: true}));
    });
    TTT.waitForResponse();
  }
  TTT.asserts(3, function () {
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-sortable"));
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-ascending"));
    assert.notOk(colNameFn().classList.contains("tobago-sheet-header-markup-descending"));
  });
  TTT.action(function () {
    leftPagingFn().value = "1";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "1986U10", "0.64", "1999",
        "Adrastea", "0.3", "1979",
        "Amalthea", "0.5", "1892",
        "Ananke", "-629.77", "1951");
  });
  TTT.action(function () {
    centerPagingFn().item(6).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Epimetheus", "0.69", "1980",
        "Erinome", "728.3", "2000",
        "Europa", "3.55", "1610",
        "Galatea", "0.43", "1989");
  });
  TTT.action(function () {
    centerPagingFn().item(10).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Phoebe", "-550.48", "1898",
        "Pluto", "90800.0", "1930",
        "Portia", "0.51", "1986",
        "Praxidike", "625.3", "2000");
  });
  TTT.action(function () {
    centerPagingFn().item(3).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Neptune", "60190.0", "1846",
        "Nereid", "360.13", "1949",
        "Oberon", "13.46", "1787",
        "Ophelia", "0.38", "1986");
  });
  TTT.startTest();
});

/**
 * 1. goto first page
 * 2. goto page 2 by pressing arrow-right
 * 3. goto last page
 * 4. goto page 21 by pressing arrow-left
 * 5. goto page 14
 */
QUnit.test("Custom Sorting: right paging", function (assert) {
  let colNameFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s2\\:customColumnName_sorter");
  let rowsFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s2 .tobago-sheet-bodyTable tbody .tobago-sheet-row");
  let leftPagingFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s2 .tobago-sheet-paging-markup-left input");
  let rightPagingFn = testFrameQuerySelectorAllFn("#page\\:mainForm\\:s2 .tobago-sheet-paging-markup-right .page-link");
  let rightPagingInputFn = testFrameQuerySelectorFn("#page\\:mainForm\\:s2 .tobago-sheet-paging-markup-right .page-link input");

  let TTT = new TobagoTestTool(assert);
  if (!colNameFn().classList.contains("tobago-sheet-header-markup-ascending")) {
    TTT.action(function () {
      colNameFn().dispatchEvent(new Event("click", {bubbles: true}));
    });
    TTT.waitForResponse();
  }
  TTT.asserts(3, function () {
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-sortable"));
    assert.ok(colNameFn().classList.contains("tobago-sheet-header-markup-ascending"));
    assert.notOk(colNameFn().classList.contains("tobago-sheet-header-markup-descending"));
  });
  TTT.action(function () {
    leftPagingFn().value = "22";
    leftPagingFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Earth", "365.26", "",
        "Elara", "259.65", "1905",
        "Enceladus", "1.37", "1789",
        "Epimetheus", "0.69", "1980");
  });
  TTT.action(function () {
    rightPagingFn().item(0).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "1986U10", "0.64", "1999",
        "Adrastea", "0.3", "1979",
        "Amalthea", "0.5", "1892",
        "Ananke", "-629.77", "1951");
  });
  TTT.action(function () {
    rightPagingFn().item(3).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Ariel", "2.52", "1851",
        "Atlas", "0.6", "1980",
        "Belinda", "0.62", "1986",
        "Bianca", "0.43", "1986");
  });
  TTT.action(function () {
    rightPagingFn().item(4).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Triton", "-5.88", "1846",
        "Umbriel", "4.14", "1851",
        "Uranus", "30685.0", "1781",
        "Venus", "224.7", "");
  });
  TTT.action(function () {
    rightPagingFn().item(1).dispatchEvent(new Event("click", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Thebe", "0.67", "1979",
        "Themisto", "130.02", "2000",
        "Titan", "15.95", "1655",
        "Titania", "8.71", "1787");
  });
  TTT.action(function () {
    rightPagingInputFn().value = "14";
    rightPagingInputFn().dispatchEvent(new Event("blur", {bubbles: true}));
  });
  TTT.waitForResponse();
  TTT.asserts(12, function () {
    ajaxExecuteBodyTableCheck(assert, rowsFn,
        "Neptune", "60190.0", "1846",
        "Nereid", "360.13", "1949",
        "Oberon", "13.46", "1787",
        "Ophelia", "0.38", "1986");
  });
  TTT.startTest();
});

function ajaxExecuteBodyTableCheck(assert, rowsFn, row0col0, row0col1, row0col2, row1col0, row1col1, row1col2,
                                   row2col0, row2col1, row2col2, row3col0, row3col1, row3col2) {
  let $row0Col0 = rowsFn().item(0).querySelectorAll(".tobago-sheet-cell").item(0).textContent.trim();
  let $row0Col1 = rowsFn().item(0).querySelectorAll(".tobago-sheet-cell").item(1).textContent.trim();
  let $row0Col2 = rowsFn().item(0).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim();
  let $row1Col0 = rowsFn().item(1).querySelectorAll(".tobago-sheet-cell").item(0).textContent.trim();
  let $row1Col1 = rowsFn().item(1).querySelectorAll(".tobago-sheet-cell").item(1).textContent.trim();
  let $row1Col2 = rowsFn().item(1).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim();
  let $row2Col0 = rowsFn().item(2).querySelectorAll(".tobago-sheet-cell").item(0).textContent.trim();
  let $row2Col1 = rowsFn().item(2).querySelectorAll(".tobago-sheet-cell").item(1).textContent.trim();
  let $row2Col2 = rowsFn().item(2).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim();
  let $row3Col0 = rowsFn().item(3).querySelectorAll(".tobago-sheet-cell").item(0).textContent.trim();
  let $row3Col1 = rowsFn().item(3).querySelectorAll(".tobago-sheet-cell").item(1).textContent.trim();
  let $row3Col2 = rowsFn().item(3).querySelectorAll(".tobago-sheet-cell").item(2).textContent.trim();

  assert.equal($row0Col0, row0col0, "row0col0");
  assert.equal($row0Col1, row0col1, "row0col1");
  assert.equal($row0Col2, row0col2, "row0col2");
  assert.equal($row1Col0, row1col0, "row1col0");
  assert.equal($row1Col1, row1col1, "row1col1");
  assert.equal($row1Col2, row1col2, "row1col2");
  assert.equal($row2Col0, row2col0, "row2col0");
  assert.equal($row2Col1, row2col1, "row2col1");
  assert.equal($row2Col2, row2col2, "row2col2");
  assert.equal($row3Col0, row3col0, "row3col0");
  assert.equal($row3Col1, row3col1, "row3col1");
  assert.equal($row3Col2, row3col2, "row3col2");
}