const child =  require('child-process-promise');
const uuid = require('uuid');
const path = require('path');
const s3Unzip = require("s3-unzip");
var zipFolder = require('zip-folder');

async function fetchApp (args) {
    return await child.spawn('gatsby', args, {capture: ['stdout', 'stderr']});
}

async function buildApp() {
    return await child.spawn('gatsby', ['build'], {capture: ['stdout', 'stderr']});
}

async function upload(zipfile, bucket) {
    var s = new s3Unzip({
        bucket: bucket,
        file: zipfile,
        deleteOnSuccess: true,
        verbose: false
      }, function(err, success){
        if (err) console.error(err);
        else console.log(success);
      });
}

async function zip(location, zipfile) {
    zipFolder(path.join(location, '/public'), zipfile, function(err, data) {
        if(err) {
            console.log('oh no!', err);
        } else {
            console.log('EXCELLENT');

        }
    });
}
const regen = () => {
  // pull starter
  const id = uuid.v4();
  const location = path.join('/tmp',id);
  const starter = 'https://github.com/ChangoMan/gatsby-starter-dimension';
  const args = ['new', location, starter]; 
  const filename = id+'.zip';
  const zipfile = path.join('/tmp/',filename);
  console.log(zipfile);

  fetchApp(args)
    .then(buildApp)
    .then(zip(location, zipfile))
    .then(upload(zipfile, "regen-stage",))
    .catch(console.error);
};

regen();

module.exports = regen;