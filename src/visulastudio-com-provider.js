
const BaseProvider = require("./base-provider");

const querystring = require("querystring");

class VisualStudio extends BaseProvider {
    get baseUrl() {
        return `https://${this.gitUrl.resource}${this.gitUrl.pathname}`
            .replace(/\.git/, "");
    }

    webUrl(branch, filePath, line, endLine) {
        let query = {
            version: `GB${this._branch}`
        };

        if (filePath) {
            query["path"] = filePath;
        }

        if (line) {
            query["line"] = line;
        }

        return `${this.baseUrl}?${querystring.stringify(query)}`;
    }

    prUrl(branch) {
        throw new Error(
            `Doesn't support Merge Request from URL in VisualStudio.com yet`
        );
    }
}

module.exports = VisualStudio;
