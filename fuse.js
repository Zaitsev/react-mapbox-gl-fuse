const { Babel7Plugin, FuseBox, Sparky, WebIndexPlugin, SVGPlugin, CSSPlugin, QuantumPlugin, EnvPlugin, JSONPlugin } = require('fuse-box');
const { src, task, watch, context, fuse } = require('fuse-box/sparky');


context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: 'src',
            output: 'dist/$name.js',
            target: 'browser',
            cache: true,
            hash: this.isProduction,
            sourceMaps: { project: true, vendor: true },
            log: true,
            // allowSyntheticDefaultImports: true,
            plugins: [
                EnvPlugin({ NODE_ENV: 'development' }),
                Babel7Plugin({
                    config: {
                        sourceMaps: true,
                        presets: ["@babel/preset-env", "@babel/preset-react"],

                        plugins: [
                            '@babel/proposal-class-properties'
                        ]
                    },
                }),
                // JSONPlugin(),
                CSSPlugin(),
                // SVGPlugin(),
                WebIndexPlugin({
                    path: '.',
                    // bundles : ['vendor', 'render'],
                    template: 'src/index.html'
                }),
                this.isProduction && QuantumPlugin({
                    bakeApiIntoBundle: 'app',
                    uglify: true,
                    css: true
                })
            ]
        });
    }

    createBundle(fuse) {
        const app = fuse.bundle('app');
        if (!this.isProduction) {
            app.watch()
                .hmr()
            ;
        }
        app.instructions('>app.tsx');

        return app;
    }
});

task('clean', () => src('dist').clean('dist').exec());

task('default', ['clean'], async context => {
    const fuse = context.getConfig();
    fuse.dev({
        httpServer: true,
        // open: true,
        // port: 8080,
    });
    context.createBundle(fuse);
    await fuse.run();
});

task('dist', ['clean'], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    fuse.dev(); // remove it later
    context.createBundle(fuse);
    await fuse.run();
});
