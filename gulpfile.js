const uswds = require('@uswds/compile');

uswds.settings.version = 3;
uswds.paths.dist.css = './assets/uswds/css'
uswds.paths.dist.theme = './sass/uswds';

exports.init = uswds.init;
exports.compile = uswds.compile;
exports.watch = uswds.watch;