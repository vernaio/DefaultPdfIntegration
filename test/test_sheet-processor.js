const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-string'));

var main = require("../index");

const tmp = require('tmp');
const fs = require('fs');
const path = require('path');
var rimraf = require("rimraf");

describe("Sheet Processor", function () {

    it("Unpackage XJDF.", function (done) {

        // arrange
        var sheetDirectory = tmp.dirSync().name;
        fs.copyFileSync(__dirname + "/resources/sheet-processor/150-D3CA.xjdf.zip", path.join(sheetDirectory, "150-D3CA.xjdf.zip"))

        var outputFiles = {};
        outputFiles.xjdf = "150-D3CA.xjdf.zip"

        // act
        main.processSheet(sheetDirectory, outputFiles)
            .then(() => {

                var files = fs.readdirSync(sheetDirectory)

                // assert
                expect(files.length).to.equal(5);

                expect(files.includes("150-D3CA.xjdf.zip")).to.equal(true);
                expect(files.includes("JOB_ID.xjdf")).to.equal(true);
                expect(files.includes("artwork.pdf")).to.equal(true);
                expect(files.includes("identification.pdf")).to.equal(true);
                expect(files.includes("thumb.jpg")).to.equal(true);

                for(i in files) {
                    console.log(files[i]);
                }

                console.log("delete tmp directory " + sheetDirectory);
                rimraf.sync(sheetDirectory);

                done();
            });
    });


    it("Generate Sheet ID.", function (done) {

        // arrange
        var event = {};

        event.id = "abcdefghi";
        event.label = "123456789"

        // act
        main.generateSheetId(event)
            .then((sheetId) => {
                expect(sheetId).to.equal("56789-ABCD");
                done();
            });

    });
});