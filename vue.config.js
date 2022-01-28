// vue.config.js
module.exports = {
  chainWebpack: config => config.resolve.symlinks(false),

  lintOnSave: 'warning',

  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_mixins.scss";
        `
      }
    }
  },
}