const fs = require('fs');
const path = require('path');

/**
 * Extracts complete jobs from the input folder and return result as object array.
 */
exports.extractJobs = function (pathDataIn) {
    return new Promise((resolve, reject) => {

        // regex file types
        const regPdf = /^([a-zA-Z0-9\.\-]*)_([0-9]*)_(.*)\.(pdf|PDF|Pdf)$/;

        // read files
        var files = []

        fs.readdirSync(pathDataIn).forEach(file => {
            files.push(pathDataIn + "/" + file);
        });

        // find all Job XMLs
        var result = [];

        for (let file of files) {
            let pdfMatch = path.basename(file).match(regPdf);

            if (pdfMatch) {
                result.push(
                    {
                        jobId: pdfMatch[1],
                        files: [file],
                        amount: Number(pdfMatch[2]),
                        label: pdfMatch[3]
                    }
                );
            }
        }

        // return result
        resolve(result);
    });
}