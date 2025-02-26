import esbuild from "esbuild";
import { execSync } from "child_process";
import path from "path";
import fs from "fs";

// Ensure the package path is correct
const absolutePackageDir = path.resolve(process.cwd());
const entryPoint = path.join(absolutePackageDir, "src/index.ts");
const outDir = path.join(absolutePackageDir, "lib");
const tsConfigPath = path.join(absolutePackageDir, "tsconfig.json");

// Ensure entry point exists
if (!fs.existsSync(entryPoint)) {
  console.error(`❌ Error: Entry point not found: ${entryPoint}`);
  process.exit(1);
}

// Shared Esbuild Config
const sharedConfig = {
  entryPoints: [entryPoint],
  bundle: true,
  minify: true,
  sourcemap: true,
  external: ["react", "react-dom", "@rsxt/react-listener"],
  target: ["esnext", "node16"],
};

console.log(`🚀 Building ${absolutePackageDir}...`);

// Build ESM Output
esbuild.build({
  ...sharedConfig,
  format: "esm",
  outdir: path.join(outDir, "esm"),
}).catch(() => process.exit(1));

// Build CJS Output
esbuild.build({
  ...sharedConfig,
  format: "cjs",
  outdir: path.join(outDir, "cjs"),
}).catch(() => process.exit(1));

// Ensure tsconfig exists
if (!fs.existsSync(tsConfigPath)) {
  console.error(`❌ Error: TypeScript config not found: ${tsConfigPath}`);
  process.exit(1);
}

console.log(`🚀 Generating types for  ${absolutePackageDir} and ${tsConfigPath}...`);
// Generate TypeScript Declarations
// execSync(`tsc --project ${tsConfigPath}`, { stdio: "inherit" });
// run yarn generate:types for the package
execSync(`yarn generate:types`, { stdio: "inherit" });

console.log(`✅ Build completed for ${absolutePackageDir}`);
