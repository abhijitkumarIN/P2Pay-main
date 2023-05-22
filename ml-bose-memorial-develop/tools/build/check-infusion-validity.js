const app = require('../../apps/cloud/src/app/settings/app.json');
if (app.exportConfig !== 'KleeenInfusion') {
  throw new Error(
    `=================================================================================

    IN ORDER TO MAKE KLEEEN INFUSION FEATURE WORK PROPERLY
    MAKE SURE INFUSION EXPORT TYPE IS SELECTED AT https://kleeen.cloud/export-settings

    ====================================================================================`,
  );
}
