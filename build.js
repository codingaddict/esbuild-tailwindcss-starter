const esbuild = require("esbuild");
const open = require("open");
const postCssPlugin = require("esbuild-plugin-postcss2").default;
esbuild
  .serve(
    { servedir: "dist", port: 3000 },
    {
      // .build({
      platform: "browser",
      entryPoints: ["src/index.js"],
      outdir: "dist",
      logLevel: "info",
      logLimit: 0,
      bundle: true,
      sourcemap: true,
      define: {
        "process.env.NODE_ENV": '"development"',
      },
      // watch: {
      //   onRebuild(error, result) {
      //     if (error) console.error("watch build failed:", error);
      //     else console.log("watch build succeeded:", result);
      //   },
      // },
      loader: {
        ".js": "jsx",
      },
      plugins: [
        postCssPlugin({
          plugins: [
            require("postcss-import"),
            require("tailwindcss"),
            require("autoprefixer"),
            require("postcss-preset-env")({ stage: 1 }),
          ],
        }),
      ],
    }
  )
  .then(async ({ port }) => {
    const url = `http://localhost:${port}`;
    console.log(`Serving at ${url}`);
    await open(url);
  })
  // .then(({ warnings }) => {
  //   console.log(
  //     `Build completed ${warnings ? `with warnings:\n${warnings}` : ""}`
  //   );
  // })
  .catch((error) => console.error(error));
