/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.apache.myfaces.tobago.example.demo;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.drone.api.annotation.Drone;
import org.jboss.arquillian.graphene.findby.FindByJQuery;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.test.api.ArquillianResource;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.shrinkwrap.resolver.api.maven.archive.importer.MavenImporter;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@RunWith(Arquillian.class)
@RunAsClient
public class QUnitTests {

  private static final Logger LOG = LoggerFactory.getLogger(QUnitTests.class);
  private static List<String> testedPages = new LinkedList<String>();

  @Drone
  private WebDriver browser;
  @ArquillianResource
  private URL contextPath;
  @FindByJQuery("#qunit")
  private WebElement qunit;

  @Deployment
  public static WebArchive createDeployment() {
    File pom = new File("tobago-example/tobago-example-demo/pom.xml");
    WebArchive webArchive = ShrinkWrap.create(MavenImporter.class).
            loadPomFromFile(pom, "jsf-provided", "!myfaces-2.0").importBuildOutput()
            .as(WebArchive.class);
    // XXX there should be a proper profile in POM for that
    webArchive.delete("/WEB-INF/lib/hibernate-validator-4.3.2.Final.jar");
    return webArchive;
  }

  private void setupBrowser(String page, String testJs) throws UnsupportedEncodingException {
    browser.get(contextPath + "/faces/test.xhtml?page=" + URLEncoder.encode(page, "UTF-8") + "&testjs="
            + URLEncoder.encode(testJs, "UTF-8"));
  }

  private void runStandardTest(String page) throws UnsupportedEncodingException {
    testedPages.add(page);

    String testJs = page.substring(0, page.length() - 6) + ".test.js";
    setupBrowser(page, testJs);

    checkQUnitResults(page);
  }

  private void checkQUnitResults(String page) {
    WebElement qunitTests = qunit.findElement(By.id("qunit-tests"));
    List<WebElement> testCases = qunitTests.findElements(By.xpath("li"));
    Assert.assertTrue("There must be at least one test case.", testCases.size() > 0);

    for (WebElement testCase : testCases) {
      String testName = testCase.findElement(By.className("test-name")).getText();
      String runtime = testCase.findElement(By.className("runtime")).getText();

      if ("pass".equals(testCase.getAttribute("class"))) {
        LOG.info("test '" + testName + "' for " + page + " passed in " + runtime);
        Assert.assertTrue(true);
      } else if ("fail".equals(testCase.getAttribute("class"))) {
        WebElement assertList = testCase.findElement(By.className("qunit-assert-list"));
        List<WebElement> asserts = assertList.findElements(By.tagName("li"));

        int assertionCount = 0;
        for (WebElement assertion : asserts) {
          assertionCount++;
          if ("pass".equals(assertion.getAttribute("class"))) {
            Assert.assertTrue(true);
          } else if ("fail".equals(assertion.getAttribute("class"))) {
            WebElement source = assertion.findElement(By.className("test-source"));
            LOG.warn("test '" + testName + "' for " + page + " failed on assertion " + assertionCount
                    + "\n" + source.getText());
            String expected = assertion.findElement(By.className("test-expected")).getText();
            expected = expected.substring(12, expected.length() - 1);
            String actual = assertion.findElement(By.className("test-actual")).getText();
            actual = actual.substring(10, actual.length() - 1);
            Assert.assertEquals(expected, actual);
          }
        }
      } else if ("running".equals(testCase.getAttribute("class"))) {
        LOG.warn("test '" + testName + "' for " + page + " is still running...");
        Assert.fail();
      } else {
        LOG.warn("unexpected error on test '" + testName + "' for " + page);
        Assert.fail();
      }
    }
  }

  @AfterClass
  public static void checkMissingTests() {
    if (testedPages.size() > 1) {
      File dir = new File("tobago-example/tobago-example-demo/src/main/webapp/content");
      List<String> testablePages = getTestablePages(dir);

      StringBuilder stringBuilder = new StringBuilder();
      for (String testablePage : testablePages) {
        if (!testedPages.contains(testablePage)) {
          String errorString = "missing testmethod for " + testablePage;
          LOG.warn(errorString);
          stringBuilder.append("\n");
          stringBuilder.append(errorString);
        }
      }

      Assert.assertEquals(stringBuilder.toString(), testablePages.size(), testedPages.size());
    }
  }

  private static List<String> getTestablePages(File dir) {
    List<String> testablePages = new ArrayList<String>();
    for (File file : dir.listFiles()) {
      if (file.isDirectory()) {
        testablePages.addAll(getTestablePages(file));
      } else if (file.getName().endsWith(".test.js")) {
        String path = file.getPath().substring(
                "tobago-example/tobago-example-demo/src/main/webapp/".length(),
                file.getPath().length() - 8)
                .concat(".xhtml");
        testablePages.add(path);
      }
    }
    return testablePages;
  }

  @Test
  public void testAccessAllPages() throws UnsupportedEncodingException {
    File dir = new File("tobago-example/tobago-example-demo/src/main/webapp/content");
    List<String> pages = getXHTMLs(dir);
    String testJs = "error/error.test.js";
    List<WebElement> results;

    // Test if 'has no exception' test is correct.
    setupBrowser("error/exception.xhtml", testJs);
    results = qunit.findElement(By.id("qunit-tests")).findElements(By.xpath("li"));
    Assert.assertEquals(results.get(0).getAttribute("class"), "fail");
    Assert.assertEquals(results.get(1).getAttribute("class"), "pass");

    // Test if 'has no 404' test is correct.
    setupBrowser("error/404.xhtml", testJs);
    results = qunit.findElement(By.id("qunit-tests")).findElements(By.xpath("li"));
    Assert.assertEquals(results.get(0).getAttribute("class"), "pass");
    Assert.assertEquals(results.get(1).getAttribute("class"), "fail");

    for (String page : pages) {
      setupBrowser(page, testJs);
      checkQUnitResults(page);
    }
  }

  private List<String> getXHTMLs(File dir) {
    List<String> xhtmls = new ArrayList<String>();
    for (File file : dir.listFiles()) {
      if (file.isDirectory()) {
        xhtmls.addAll(getXHTMLs(file));
      } else if (!file.getName().startsWith("x-") && file.getName().endsWith(".xhtml")) {
        String path = file.getPath().substring("tobago-example/tobago-example-demo/src/main/webapp/".length());
        xhtmls.add(path);
      }
    }
    return xhtmls;
  }

  @Test
  public void in() throws UnsupportedEncodingException {
    String page = "content/20-component/010-input/10-in/in.xhtml";
    runStandardTest(page);
  }

  @Test
  public void date() throws UnsupportedEncodingException {
    String page = "content/20-component/010-input/40-date/date.xhtml";
    runStandardTest(page);
  }

  @Test
  public void selectBooleanCheckbox() throws UnsupportedEncodingException {
    String page = "content/20-component/030-select/10-selectBooleanCheckbox/selectBooleanCheckbox.xhtml";
    runStandardTest(page);
  }

  @Test
  public void selectOneChoice() throws UnsupportedEncodingException {
    String page = "content/20-component/030-select/20-selectOneChoice/selectOneChoice.xhtml";
    runStandardTest(page);
  }

  @Test
  public void selectOneRadio() throws UnsupportedEncodingException {
    String page = "content/20-component/030-select/30-selectOneRadio/selectOneRadio.xhtml";
    runStandardTest(page);
  }

  @Test
  public void selectOneListbox() throws UnsupportedEncodingException {
    String page = "content/20-component/030-select/40-selectOneListbox/selectOneListbox.xhtml";
    runStandardTest(page);
  }

  @Test
  public void selectManyCheckbox() throws UnsupportedEncodingException {
    String page = "content/20-component/030-select/50-selectManyCheckbox/selectManyCheckbox.xhtml";
    runStandardTest(page);
  }

  @Test
  public void form() throws UnsupportedEncodingException {
    String page = "content/30-concept/08-form/form.xhtml";
    runStandardTest(page);
  }

  @Test
  public void formRequired() throws UnsupportedEncodingException {
    String page = "content/30-concept/08-form/10-required/form-required.xhtml";
    runStandardTest(page);
  }

  @Test
  public void formAjax() throws UnsupportedEncodingException {
    String page = "content/30-concept/08-form/20-ajax/form-ajax.xhtml";
    runStandardTest(page);
  }

  @Test
  public void testDate() throws UnsupportedEncodingException {
    String page = "content/40-test/1040-date/date.xhtml";
    runStandardTest(page);
  }

  @Test
  public void rendererBaseGetCurrentValue() throws UnsupportedEncodingException {
    String page = "content/40-test/50000-java/10-rendererBase-getCurrentValue/rendererBase-getCurrentValue.xhtml";
    runStandardTest(page);
  }

  @Test
  public void ajaxExecute() throws UnsupportedEncodingException {
    String page = "content/40-test/50000-java/20-ajax-execute/ajax-execute.xhtml";
    runStandardTest(page);
  }
}
