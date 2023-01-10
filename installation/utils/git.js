const fs = require("fs");
const exists = fs.existsSync;
const path = require("path");

/**
 * @returns {string}
 */
module.exports.findGitBasePath = () => {
  let relativePath = "";

  while (true) {
    const currentPath = path.resolve(process.cwd(), `${relativePath}`);
    const currentGitPath = path.resolve(currentPath, ".git");
    if (currentPath === "/") {
      break;
    }

    try {
      const gitStats = fs.statSync(currentGitPath);

      //submodule is detected
      if (gitStats.isFile()) {
        const fileContent = fs.readFileSync(currentGitPath, {
          encoding: "utf-8",
        });
        if (/gitdir/.test(fileContent)) {
          const gitDirectoryPath = fileContent.split("gitdir: ")[1];
          return path.resolve(process.cwd(), gitDirectoryPath);
        }
      }

      if (gitStats.isDirectory()) {
        return currentGitPath;
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        console.error(`Could not find git directory/file at: ${currentPath}`);
      }
    }
    relativePath += "../";
  }

  return null;
};
