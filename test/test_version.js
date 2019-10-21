var expect = require("chai").expect;
var main = require("../index");

describe("Check version", function () {
    it("Get current version", function () {
        var version = main.getVersion();

        expect(version.name).to.equal("default-flow-logic");
        expect(version.versionNumber).to.equal("1.0.3");

    });
});