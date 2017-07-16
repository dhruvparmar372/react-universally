/**
 * This file resolves the entry assets available from our client bundle.
 */

import fs from 'fs';
import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';
import config from '../../../config';

function getJSONFromFile(fileName) {
  const filePath = pathResolve(
    appRootDir.get(),
    config('bundles.client.outputPath'),
    `./${fileName}`,
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `We could not find the "${filePath}" file. Please ensure that the client bundle has been built.`,
    );
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

/**
 * Retrieves the js/css for the named chunks that belong to our client bundle.
 *
 * Note: the order of the chunk names is important. The same ordering will be
 * used when rendering the scripts.
 *
 * This is useful to us for a couple of reasons:
 *   - It allows us to target the assets for a specific chunk, thereby only
 *     loading the assets we know we will need for a specific request.
 *   - The assets are hashed, and therefore they can't be "manually" added
 *     to the render logic.  Having this method allows us to easily fetch
 *     the respective assets simply by using a chunk name. :)
 */
export function getClientBundleEntryAssets() {
  let resultCache;

  // Return the assets json cache if it exists.
  // In development mode we always read the assets json file from disk to avoid
  // any cases where an older version gets cached.
  if (process.env.BUILD_FLAG_IS_DEV === 'false' && resultCache) {
    return resultCache;
  }

  const clientBundleAssetsJSON = getJSONFromFile(config('bundleAssetsFileName'));

  if (typeof clientBundleAssetsJSON.index === 'undefined') {
    throw new Error('No asset data found for expected "index" entry chunk of client bundle.');
  }

  resultCache = clientBundleAssetsJSON.index;
  return resultCache;
}

export function getClientWebpackManifest() {
  let resultCache;

  if (resultCache) {
    return resultCache;
  }

  resultCache = getJSONFromFile(config('bundleManifestFileName'));
  return resultCache;
}
