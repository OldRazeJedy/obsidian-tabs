import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import builtinModules from 'module';

const prod = process.argv[2] === 'production';
const vaultPluginDir = 'F:/MyGame/Personal/.obsidian/plugins/tabs';

function syncOutputs() {
  fs.mkdirSync('dist', { recursive: true });
  fs.copyFileSync('manifest.json', path.join('dist', 'manifest.json'));

  for (const file of ['main.js', 'styles.css', 'manifest.json']) {
    const src = path.join('dist', file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, file);
    }
  }

  if (fs.existsSync('F:/MyGame/Personal/.obsidian/plugins')) {
    fs.mkdirSync(vaultPluginDir, { recursive: true });
    for (const file of ['main.js', 'styles.css', 'manifest.json']) {
      const src = path.join('dist', file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(vaultPluginDir, file));
      }
    }
  }
}

const syncPlugin = {
  name: 'sync-outputs',
  setup(build) {
    build.onEnd(result => {
      if (result.errors.length === 0) {
        syncOutputs();
      }
    });
  },
};

const jsContext = await esbuild.context({
  entryPoints: ['src/main.ts'],
  bundle: true,
  external: ['obsidian', 'electron', ...builtinModules.builtinModules],
  format: 'cjs',
  target: 'es2018',
  logLevel: 'info',
  sourcemap: prod ? false : 'inline',
  treeShaking: true,
  minify: prod,
  outfile: 'dist/main.js',
});

const cssContext = await esbuild.context({
  entryPoints: ['src/styles.css'],
  bundle: true,
  logLevel: 'info',
  minify: prod,
  outfile: 'dist/styles.css',
  plugins: [syncPlugin],
});

if (prod) {
  await jsContext.rebuild();
  await cssContext.rebuild();
  await jsContext.dispose();
  await cssContext.dispose();
} else {
  await jsContext.watch();
  await cssContext.watch();
}
