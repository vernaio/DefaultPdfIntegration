const expect = require("chai").expect;
const main = require("../index.js");

describe("Post-Process BinderySignature per Job", function () {

    it("No changes", function (done) {

        // arrange
        var binderySignatures = [{ "foo": "bar-1" }, { "foo": "bar-2" }];
        var job = { "id": "42" };

        // act
        main.processJobBinderySignatures(binderySignatures, job)
            .then((modifiedBinderySignatures) => {

                // assert
                expect(modifiedBinderySignatures.length).to.equal(2);

                expect(modifiedBinderySignatures[0].foo).to.equal("bar-1");
                expect(modifiedBinderySignatures[1].foo).to.equal("bar-2");

                done()
            });

    });
});
