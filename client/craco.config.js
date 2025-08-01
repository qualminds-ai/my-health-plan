module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    webpack: {
        configure: (webpackConfig, { env }) => {
            // Add cache busting for production builds
            if (env === 'production') {
                // Ensure unique filenames for cache busting
                webpackConfig.output.filename = 'static/js/[name].[contenthash:8].js';
                webpackConfig.output.chunkFilename = 'static/js/[name].[contenthash:8].chunk.js';

                // Configure asset filenames with content hash
                const oneOf = webpackConfig.module.rules.find(rule => rule.oneOf);
                if (oneOf) {
                    const assetRule = oneOf.oneOf.find(rule => rule.type === 'asset');
                    if (assetRule) {
                        assetRule.generator = {
                            filename: 'static/media/[name].[contenthash:8][ext]'
                        };
                    }
                }
            }
            return webpackConfig;
        }
    }
}
