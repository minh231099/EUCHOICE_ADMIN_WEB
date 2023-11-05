const {
  override,
  fixBabelImports,
  overrideDevServer,
  addBabelPlugin,
  watchAll,
} = require('customize-cra');

module.exports = {
  webpack: override(
    addBabelPlugin('@babel/plugin-proposal-optional-chaining'),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
    // config = rewireLess.withLoaderOptions({
    //   modifyVars: { '@primary-color': '#439F46' },
    //   javascriptEnabled: true,
    // })(config, env)
    // return config
  ),
  devServer: overrideDevServer(
    (config) => ({
      ...config,
      proxy: {
        '/v1': {
          target: process.env.REACT_APP_EUCHOICE_DOMAIN,
          changeOrigin: true,
          secure: false
        },
      },
      compress: false,
    }),
    watchAll()
  ),
};