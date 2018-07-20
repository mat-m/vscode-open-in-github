const BaseProvider = require("./base-provider");

class GitLab extends BaseProvider {

  webUrl(branch, filePath, line, endLine) {
    if (filePath) {
      return (
        `${this.baseUrl}/blob/${branch}` +
        (filePath ? `${filePath}` : "") +
        (line ? `#L${line}` : "") +
        (endLine ? "-" + endLine : "")
      );
    }

    return `${this.baseUrl}/tree/${branch}`;
  }

  prUrl(branch) {
    //https://docs.gitlab.com/ee/api/merge_requests.html#create-mr
    //`${this.baseUrl}/pull-requests/new?source_branch=${branch}&target_branch=${????}&title=${????}`
    throw new Error(`Doesn't support Merge Request from URL in GitLab yet`);
  }
}

module.exports = GitLab;
