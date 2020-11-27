const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#28e0c1',
              '@link-color': '#28e0c1',
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