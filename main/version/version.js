const pjson = require('./../../package.json');

/**
 * Returns the flow logic's version details.
 */
exports.getVersion = function() {
    var version = {
        name: pjson.name,
        versionNumber: pjson.version,
        description: pjson.description
    }

    return version;
}