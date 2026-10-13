// Helper: import a TypeScript module from Node scripts by bundling it with esbuild
// (esbuild ships with @angular-devkit/build-angular). npm packages stay external.
import { build } from 'esbuild';
import { rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function importTs(entry) {
  const outfile = join(tmpdir(), `etr-ts-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}.mjs`);
  await build({
    entryPoints: [resolve(entry)],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node18',
    packages: 'external',
    outfile,
    logLevel: 'error',
  });
  try {
    return await import(pathToFileURL(outfile).href);
  } finally {
    rmSync(outfile, { force: true });
  }
}
