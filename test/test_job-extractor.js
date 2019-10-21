const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-string'));

var main = require("../index");

describe("Extract jobs", function () {

    it("result: two jobs.", function () {

        // arrange
        var pathDataIn = __dirname + "/resources/job-extractor/in-1";

        // act
        var result = main.extractJobs(pathDataIn);

        // assert
        expect(result.length).to.equal(2);

        expect(result[0].jobId).to.equal("42");
        expect(result[0].files[0]).to.endsWith("job-extractor/in-1/42_5000_This is my flyer.PDF");
        expect(result[0].amount).to.equal(5000);
        expect(result[0].label).to.equal("This is my flyer");

        expect(result[1].jobId).to.equal("d-43.ee");
        expect(result[1].files[0]).to.endsWith("job-extractor/in-1/d-43.ee_1000_This is my_label.pdf");
        expect(result[1].amount).to.equal(1000);
        expect(result[1].label).to.equal("This is my_label");
    });
});