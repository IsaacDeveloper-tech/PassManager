const Changelog = require('generate-changelog');
const Fs        = require('fs');

return Changelog.generate({ repoUrl: 'https://github.com/IsaacDeveloper-tech/PassManager.git' })
.then(function (changelog) {
  Fs.writeFileSync('./CHANGELOG.md', changelog);
});