"use strict";

const workspace = require("vscode").workspace;
const providerProtocol = workspace.getConfiguration("openInGitHub").get("providerProtocol", "https");

class BaseProvider {
    constructor(gitUrl, sha, branch) {
        this.gitUrl = gitUrl;
        this.sha = sha;
        this._branch = branch;
    }

    get baseUrl() {
        return this.gitUrl.toString(providerProtocol).replace(/(\.git)$/, "");
    }

    /**
     * Get the Web URL.
     *
     * @param {string} branch
     * @param {string} filePath The file path relative to repository root, beginning with '/'.
     * @param {number} line
     * @param {number} endLine The last line in a multi-line selection
     * @return {string} The URL to be opened with the browser.
     */
    webUrl(branch, filePath, line, endLine) {
        throw new Error("should be implemented in subclasses");
    }

    prUrl(branch) {
        throw new Error("should be implemented in subclasses");
    }
}

module.exports = BaseProvider;
