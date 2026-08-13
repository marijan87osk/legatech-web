import { createHash } from "node:crypto";
import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const releaseDirectory = path.join(projectRoot, "release");
const archiveName = "legatech-site.tar.gz";
const scriptName = "deploy-siteground.sh";
const repository = process.env.GITHUB_REPOSITORY ?? "";
const sha = process.env.GITHUB_SHA ?? "";
const branch = process.env.GITHUB_REF_NAME ?? "";

if (!/^[a-f0-9]{40}$/i.test(sha)) throw new Error("GITHUB_SHA nije valjan commit SHA.");
if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) throw new Error("GITHUB_REPOSITORY nije valjan.");
if (branch !== "main") throw new Error("Produkcijski artifact smije se graditi samo s grane main.");

async function describeFile(fileName) {
  const filePath = path.join(releaseDirectory, fileName);
  const [contents, details] = await Promise.all([readFile(filePath), stat(filePath)]);
  return {
    file: fileName,
    bytes: details.size,
    sha256: createHash("sha256").update(contents).digest("hex"),
  };
}

const archive = await describeFile(archiveName);
const deployScript = await describeFile(scriptName);
const manifest = {
  schemaVersion: 1,
  repository,
  branch,
  sha: sha.toLowerCase(),
  artifactName: `legatech-production-${sha.toLowerCase()}`,
  builtAt: new Date().toISOString(),
  archive,
  deployScript,
};

await Promise.all([
  writeFile(path.join(releaseDirectory, "release.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8"),
  writeFile(path.join(releaseDirectory, `${archiveName}.sha256`), `${archive.sha256}  ${archiveName}\n`, "utf8"),
  writeFile(path.join(releaseDirectory, `${scriptName}.sha256`), `${deployScript.sha256}  ${scriptName}\n`, "utf8"),
]);

console.log(`Pripremljen artifact ${manifest.artifactName}.`);
