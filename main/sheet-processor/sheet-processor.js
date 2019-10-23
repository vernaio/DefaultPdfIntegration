const path = require('path');
const fs = require('fs');
const unzipper = require('unzipper');

exports.processSheet = function (sheetDirectory, outputFiles) {
    return new Promise((resolve, reject) => {
        var pathXJdf = path.join(sheetDirectory, outputFiles.xjdf);

        fs.createReadStream(pathXJdf)
            .pipe(unzipper.Parse())
            .on('entry', function (entry) {
                const fileName = entry.path;
                const targetPath = path.join(sheetDirectory, path.basename(fileName));

                entry.pipe(fs.createWriteStream(targetPath));
            })
            .promise()
            .then(() => resolve(), e => reject(e));
    });
}

exports.generateSheetId = function(event) {
    return new Promise((resolve, reject) => {

        // extract details
        var id = event.id;
        var label = event.label;

        // generate sheet id
        resolve(label.substring(4, label.length) + "-" + id.substring(0, 4).toUpperCase());

    });
}
