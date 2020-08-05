var fs = require("fs");

const gradleProperties = [
  "android.useAndroidX=true",
  "android.enableJetifier=true",
];

/**
 * Changes the target gradlePropertiesFile adding or changing existing properties with key
 * @param propertyAndValArray - An array with items in the format `key=value`
 * @param gradlePropertiesFile - location of the gradle.properties file
 */
function setGradleProperties(propertyAndValArray, gradlePropertiesFile) {
  let fileContents = fs.readFileSync(gradlePropertiesFile, "utf-8");

  propertyAndValArray.forEach(function (propertyAndVal) {
    console.log(`Parsing ${propertyAndVal} ...`);
    let propertyName = propertyAndVal.split("=")[0];
    let propertyVal = propertyAndVal.split("=")[1];
    let containsProperty = fileContents.match(propertyName);
    if (containsProperty) {
      console.log(`Property ${propertyName} exists, setting value to false`);
      fileContents = fileContents.replace(
        `${propertyName}=.+`,
        `${propertyName}=${propertyVal}`
      );
    } else {
      console.log(
        `Adding property ${propertyName} with value ${propertyVal}`
      );
      fileContents += `\n${propertyName}=${propertyVal}`;
    }
    fs.writeFileSync(gradlePropertiesFile, fileContents, "utf-8");
  });
}

/**
 * Changes the target gradlePropertiesFile adding or changing existing properties with key
 * @param propertyAndValArray - An array with items in the format `key=value`
 * @param gradlePropertiesFile - location of the gradle.properties file
 */
function createGradleProperties(propertyAndValArray, gradlePropertiesFile) {
  propertyAndValArray.forEach(function (propertyAndVal) {
    let propertyName = propertyAndVal.split("=")[0];
    let propertyVal = propertyAndVal.split("=")[1];
    console.log(`Adding property ${propertyName} with value ${propertyVal}`);
    fs.appendFileSync(
      gradlePropertiesFile,
      `\n${propertyName}=${propertyVal}`,
      "utf-8"
    );
  });
}

function createGradleProperties(context) {
  let projectRoot = context.opts.projectRoot;

  const gradlePropertiesFile =
    projectRoot + "/platforms/android/gradle.properties";

  console.log("Handling gradle.properties file");
  let fileExists = fs.existsSync(gradlePropertiesFile);
  if (fileExists) {
    setGradleProperties(gradleProperties, gradlePropertiesFile);
  } else {
    console.log("gradle.properties file not found, creating it under /platforms/android/gradle.properties");
    createGradleProperties(gradleProperties, gradlePropertiesFile);
  }
}

module.exports = {
  createGradleProperties: createGradleProperties
};
