const esbuild = require("esbuild");
const postCssPlugin = require("esbuild-plugin-postcss2").default;
esbuild
  .serve(
    { servedir: "dist", port: 3000 },
    {
      // .build({
      platform: "browser",
      entryPoints: ["src/index.js"],
      outdir: "dist",
      bundle: true,
      sourcemap: true,
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
            require("@tailwindcss/jit"),
            require("autoprefixer"),
            require("postcss-preset-env")({ stage: 1 }),
          ],
        }),
      ],
    }
  )
  .then(({ host, port }) => {
    console.log(`Serving at ${host}:${port}`);
  })
  // .then(({ warnings }) => {
  //   console.log(
  //     `Build completed ${warnings ? `with warnings:\n${warnings}` : ""}`
  //   );
  // })
  .catch((error) => console.error(error));
