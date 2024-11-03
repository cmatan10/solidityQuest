const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  basePath: isProd ? '/solidityQuest' : '',
  assetPrefix: isProd ? '/solidityQuest/' : '',
  trailingSlash: true, // Ensures each page is served as a separate directory
  output: 'export', // Use this for static export compatibility
  experimental: {
    appDir: false, // Disables the `app` directory if you’re facing issues with it
  },
};
