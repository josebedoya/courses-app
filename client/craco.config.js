const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#0045a6',
              '@link-color': '#0045a6',
              '@font-family': 'Public Sans, sans-serif',
              //
              '@menu-bg': 'transparent',
              '@menu-item-color': '#fafafa',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};