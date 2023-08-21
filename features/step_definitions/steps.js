// deno-lint-ignore-file no-var
const { Given, When, Then } = require("@cucumber/cucumber");
const { assertThat, is } = require("hamjest");
const { fetchUrl } = require("fetch");
const { spec, expect } = require("pactum");

// read --> https://elser.hashnode.dev/setup-guide-for-api-testing-with-cucumber-js-and-pactumjs

Given("The app has started", async function () {
  // source file is iso-8859-15 but it is converted to utf-8 automatically
  // assume the web app is already running, this is proved by the Given pre-requisite
  const baseurl = `http://localhost:8000/`;
  // testing GET path
  this.baseresponse = await spec().get(baseurl);
  expect(this.baseresponse).should.have.status(200);
});

When("surf to the {word} page", async function (path) {
  const url = `http://localhost:8000/${path}`;
  this.response = await spec().get(url);
});

Then("get HTTP code {int} response", function (StatusCode) { //TODO to fix the logic here
  expect(this.response).should.have.status(StatusCode);
});
