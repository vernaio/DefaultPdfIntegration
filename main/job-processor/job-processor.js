const pdflib = require('pdf-lib');
const fs = require('fs');
const path = require('path');

/**
 * This implementation only supports 2sided products.
 */
exports.processJob = function (job, mediaList) {
    return new Promise((resolve, reject) => {
        // generate bindery signature
        generateFlatProduct(job)
        .then(function (bs) {
            // return bindery signatures
            var binderySignatures = []
            binderySignatures.push(bs);

            // return bindey signatures
            resolve({ binderySignatures: binderySignatures, assemblerTask: null });
        })
        .catch(e =>{
            console.dir(e.message);
            reject(e.message);
        })
    });
}

/**
 * Generates a bindery signature object for a flat, 2-sided product.
 */
async function generateFlatProduct(job) {
    try{

        // parse pdf file
        var pdfPath = job.files[0];

        let pdf  = await pdflib.PDFDocument.load(fs.readFileSync(pdfPath));
    
        let pdfPage = await pdf.getPages()[0]; // bs will be generated based on the first page attributes

        const bs = {};

        bs.id = job["jobId"];
        bs.label = job["label"];
        bs.mustDemand = job["amount"];

        // trim format
        var trimBox = pdfPage.node.TrimBox();
        var mediaBox = pdfPage.node.MediaBox();

        if(trimBox == undefined) {
            trimBox = mediaBox;
        }

        bs.trimFormat = {};
        bs.trimFormat.width = dtp2micro(trimBox.get(2) - trimBox.get(0));
        bs.trimFormat.height = dtp2micro(trimBox.get(3) - trimBox.get(1));

        // bleed
        bs.bleed = {};
        bs.bleed.left = dtp2micro(trimBox.get(0));
        bs.bleed.bottom = dtp2micro(trimBox.get(1));
        bs.bleed.right = dtp2micro(mediaBox.get(2) - trimBox.get(2));
        bs.bleed.top = dtp2micro(mediaBox.get(3) - trimBox.get(3));

        // print data
        bs.printData = {};

        bs.printData.frontPage = {}
        bs.printData.frontPage.pdfPageNumber = "1";
        bs.printData.frontPage.pdfUrl = path.join(job.storageFolder, path.basename(job.files[0]));

        if(pdf.getPages().length > 1) {
            bs.printData.backPage = {}
            bs.printData.backPage.pdfPageNumber = "2";
            bs.printData.backPage.pdfUrl = path.join(job.storageFolder, path.basename(job.files[0]));
        }

        // return bindery signature
        return bs;
    }
    catch(ex){
        throw new Error("Corrupt PDF file. Could not be parsed.");
    }
}

function dtp2micro(dtp) {
    return Math.round(dtp * 25.4 / 72 * 1000);
}