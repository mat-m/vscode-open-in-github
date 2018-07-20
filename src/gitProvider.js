"use strict";

const workspace = require("vscode").workspace;
const gitUrlParse = require("git-url-parse");

const GitHub =  require('./github-provider');
const Bitbucket =  require('./bitbucket-provider');
const GitLab =  require('./gitlab-provider');
const VisualStudio =  require('./visulastudio-com-provider');

const gitHubDomain = workspace.getConfiguration("openInGitHub").get("gitHubDomain", "github.com");
const providerType = workspace.getConfiguration("openInGitHub").get("providerType", "unknown") || "unknown";

const providers = {
  [gitHubDomain]: GitHub,
  "bitbucket.org": Bitbucket,
  "gitlab.com": GitLab,
  "visualstudio.com": VisualStudio
};

/**
 * Get the Git provider of the remote URL.
 *
 * @param {string} remoteUrl
 * @return {BaseProvider|null}
 */
function gitProvider(remoteUrl, sha, branch) {
  const gitUrl = gitUrlParse(remoteUrl);

  for (const domain of Object.keys(providers)) {
    if (domain === gitUrl.resource || domain === gitUrl.source) {
      return new providers[domain](gitUrl, sha, branch);
    } else if (domain.indexOf(providerType) > -1) {
      return new providers[domain](gitUrl, sha, branch);
    }
  }

  throw new Error("Unknown Provider");
}

module.exports = gitProvider;
