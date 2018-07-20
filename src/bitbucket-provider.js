
const BaseProvider = require("./base-provider");

const path = require("path");
const workspace = require("vscode").workspace;

const providerProtocol = workspace.getConfiguration("openInGitHub").get("providerProtocol", "https");

class Bitbucket extends BaseProvider {
  webUrl(branch, filePath, line, endLine) {
    const fileName = path.basename(filePath);
    return (
      `${this.baseUrl}/src/${this.sha}` +
      (filePath ? `${filePath}` : "") +
      (line ? `#${fileName}-${line}` : "")
    );
  }

  prUrl(branch) {
    const repo = this.baseUrl.replace(`${providerProtocol}://bitbucket.org/`,"");

    return `${
      this.baseUrl
      }/pull-requests/new?source=${repo}%3A%3A${branch}&dest=${repo}%3A%3Aintegration`;
    // looks like this:
    // https://bitbucket.org/${org/repo}/pull-requests/new?source=${org/repo}%3A%3A${branch}&dest=${org/repo}%3A%3A${destBranch}
  }
}

module.exports = Bitbucket;
