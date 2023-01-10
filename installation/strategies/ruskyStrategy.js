const fs = require("fs");

module.exports.isHuskyInstall = () => {
  try {
    const huskyDir = fs.statSync(process.cwd(), ".husky");
  } catch (error) {
    console.log(
      "Husky is not being used in this project! Checking other strategies"
    );
  }
};
