const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-string'));

var main = require("../index");

describe("Extract jobs", function () {

    it("result: two jobs.", function () {

        // arrange
        var pathDataIn = __dirname + "/resources/job-extractor/in-1";

        // act
        main.extractJobs(pathDataIn)
            .then(function (jobs) {

                // assert
                expect(jobs.length).to.equal(2);

                expect(jobs[0].jobId).to.equal("42");
                expect(jobs[0].files[0]).to.endsWith("job-extractor/in-1/42_5000_This is my flyer.PDF");
                expect(jobs[0].amount).to.equal(5000);
                expect(jobs[0].label).to.equal("This is my flyer");

                expect(jobs[1].jobId).to.equal("d-43.ee");
                expect(jobs[1].files[0]).to.endsWith("job-extractor/in-1/d-43.ee_1000_This is my_label.pdf");
                expect(jobs[1].amount).to.equal(1000);
                expect(jobs[1].label).to.equal("This is my_label");

                done();
            });
    });
});