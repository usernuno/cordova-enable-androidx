var path = require('path'),
    configXmlParser = require('./config_xml_parser'),
    changeGradleProperties = require('./change_gradle_properties');

const CORDOVA_PREFERENCE_NAME = 'EnableAndroidX';

/**
 * Validates if the platform is Android
 * @param {object} context Cordova context
 * @returns {boolean} true if the platform is Android
 */
function isPlatformAndroid(context) {
    var platform = context.opts.plugin.platform;
    return platform === 'android';
}

/**
 * Validates if AndroidX should be enabled
 * @param {object} context Cordova context
 * @returns {boolean} true if the option should be enabled
 */
function shouldEnableAndroidX(context) {
    var projectRoot = context.opts.projectRoot;
    var configPath = path.join(projectRoot, 'config.xml');
    var config = configXmlParser.getConfig(configPath);
    var scope = configXmlParser.getAndroidPlatformScope(config);
    var enable = configXmlParser.getPreferenceValue(scope, CORDOVA_PREFERENCE_NAME);
    return enable === 'true' || enable === 'True';
}

module.exports = function(context) {
    return new Promise(function(resolve) {

        console.log(`Checking if AndroidX should be enabled...`);
        if (isPlatformAndroid(context) && shouldEnableAndroidX(context)) {
            console.log(`Enabling AndroidX...`);
            changeGradleProperties.createGradleProperties(context);
        } else {
            console.log(`AndroidX won't be enabled`);
        }

        return resolve();
    });
};
