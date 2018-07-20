
const BaseProvider =  require("./base-provider");

const workspace = require("vscode").workspace;
const useCommitSHAInURL = workspace
  .getConfiguration("openInGitHub")
  .get("useCommitSHAInURL");

class GitHub extends BaseProvider {
    webUrl(branch, filePath, line, endLine) {
      let blob = branch;

      if (useCommitSHAInURL) {
        blob = this.sha;
      }

      if (filePath) {
        return (
          `${this.baseUrl}/blob/${blob}${filePath}` +
          (line ? "#L" + line : "") +
          (endLine ? "-L" + endLine : "")
        );
      }

      return `${this.baseUrl}/tree/${blob}`;
    }

    prUrl(branch) {
      return `${this.baseUrl}/pull/new/${branch}`;
    }
  }

  module.exports = GitHub;
