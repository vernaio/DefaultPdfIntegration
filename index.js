var version = require('./main/version/version');
var jobExtractor = require('./main/job-extractor/job-extractor');
var jobProcessor = require('./main/job-processor/job-processor');
var jobBsProcessor = require('./main/job-bs-processor/job-bs-processor')
var sheetProcessor = require('./main/sheet-processor/sheet-processor')

module.exports = {

  /**
   * Returns version details about this flow logic implementation.
   */
  "getVersion": version.getVersion,

  /**
   * Extracts complete jobs from the input folder.
   */
  "extractJobs": jobExtractor.extractJobs,

  /**
   * Process a extracted job object.
   */
  "processJob" : jobProcessor.processJob,

  /**
   * Post processor of BinderySignatures - just before upload to sSprintOne.
   */
  "processJobBinderySignatures" : jobBsProcessor.processJobBinderySignatures,
  
  "processSheet" : sheetProcessor.processSheet
};  