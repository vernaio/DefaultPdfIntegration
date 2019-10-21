const pdflib = require('pdf-lib');
const fs = require('fs');
const path = require('path');

/**
 * This implementation only supports 2sided products.
 */
exports.processJob = function (job) {
    return new Promise((resolve, reject) => {

        // generate bindery signature
        generateFlatProduct(job).then(function (bs) {
            // return bindery signatures
            var binderySignatures = []
            binderySignatures.push(bs);

            // return bindey signatures
            resolve({ binderySignatures: binderySignatures, assemblerTask: null });
        });
    });
}

/**
 * Generates a bindery signature object for a flat, 2-sided product.
 */
async function generateFlatProduct(job) {

    // parse pdf file
    var pdfPath = job.files[0];
    const pdf = await pdflib.PDFDocument.load(fs.readFileSync(pdfPath));

    const pdfPage = await pdf.getPages()[0]; // bs will be generated based on the first page attributes
    const bs = {};

    bs.id = job["jobId"];
    bs.label = job["label"];
    bs.mustDemand = job["amount"];

    // trim format
    var trimBox = pdfPage.node.TrimBox();

    bs.trimFormat = {};
    bs.trimFormat.width = dtp2micro(trimBox.get(2) - trimBox.get(0));
    bs.trimFormat.height = dtp2micro(trimBox.get(3) - trimBox.get(1));

    // print data
    bs.printData = {};

    bs.printData.frontPage = {}
    bs.printData.frontPage.pdfPageNumber = "1";
    bs.printData.frontPage.pdfUrl = path.join(job.storageDir, path.basename(job.files[0]));

    bs.printData.backPage = {}
    bs.printData.backPage.pdfPageNumber = "2";
    bs.printData.backPage.pdfUrl = path.join(job.storageDir, path.basename(job.files[0]));

    // return bindery signature
    return bs;
}

function dtp2micro(dtp) {
    return Math.round(dtp * 25.4 / 72 * 1000);
}