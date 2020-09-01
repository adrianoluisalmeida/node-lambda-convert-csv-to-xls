
const util = require('./s3-utils');
const convert = require('./convert');
const os = require('os');
const mime = require('mime');
const path = require('path');

exports.handler = function(event, context, callback) {

    const id = context.awsRequestId;

    const bucket = event.bucket;
    const key = event.key;
    const extension = event.extension;

    const tempPath = path.join(os.tmpdir(),  id);
    const convertedPath = path.join(os.tmpdir(), 'converted-' + id + '.' + extension);

    // repleace extension csv to xlsx
    const resultKey = key.replace(/\.[^.]+$/, `.${extension}`);

    util.downloadFileFromS3(bucket, key, tempPath)
      .then(() => convert(tempPath, convertedPath))
      .then(() => util.uploadFileToS3(
          bucket, 
          resultKey, 
          convertedPath, 
          mime.getType(extension))
      )
      .then(result => {
        const response_success = {
          statusCode: 200,
          body: JSON.stringify({
            message: resultKey
          }),
        };
        
        const response_error = {
          statusCode: 400,
          body: JSON.stringify({
              message: 'error'
          }),
        };
      
        try {
          callback(undefined, response_success)
        } catch(err) {
          callback(response_error)
        }
      });
}