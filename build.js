const esbuild = require('esbuild');
const open = require('open');
const postCssPlugin = require('esbuild-plugin-postcss2').default;
// Ensure tailwindcss is running watch in dev mode
process.env.NODE_ENV = 'development';
process.env.TAILWIND_MODE = 'watch';
// Serve with esbuild
esbuild
    .serve(
        { servedir: 'dist', port: 3000 },
        {
            // .build({
            platform: 'browser',
            entryPoints: ['src/index.js'],
            outdir: 'dist',
            logLevel: 'info',
            logLimit: 0,
            bundle: true,
            sourcemap: true,
            inject: ['./react-shim.js'],
            // watch: {
            //   onRebuild(error, result) {
            //     if (error) console.error("watch build failed:", error);
            //     else console.log("watch build succeeded:", result);
            //   },
            // },
            loader: {
                '.js': 'jsx',
                '.svg': 'dataurl',
            },
            plugins: [
                postCssPlugin({
                    plugins: [
                        require('postcss-import'),
                        require('tailwindcss'),
                        require('autoprefixer'),
                        require('postcss-preset-env')({ stage: 1 }),
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
