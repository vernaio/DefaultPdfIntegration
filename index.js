var version = require('./main/version/version');
var jobExtractor = require('./main/job-extractor/job-extractor');
var jobProcessor = require('./main/job-processor/job-processor');
var jobBsProcessor = require('./main/job-bs-processor/job-bs-processor')
var sheetProcessor = require('./main/sheet-processor/sheet-processor')
var filesMover = require('./main/files-mover/files-mover')

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
  
  /**
   * Generation of the sheet's id.
   */
  "generateSheetId" : sheetProcessor.generateSheetId,

  /**
   * Post processor for the generated sheet files.
   */
  "processSheet" : sheetProcessor.processSheet,
  
   /**
   * Post processor for moving job related files
   */
  "moveFiles" : filesMover.moveFiles  
};  