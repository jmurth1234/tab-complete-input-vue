module.exports = {
  title: 'Vue Tab Complete Input',
  description: 'A tab completable <input> component for Vue.js ',
  base: '/',
  themeConfig: {
    navbar: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/docs.html' },
      {
        text: 'GitHub',
        link: 'https://github.com/rymate1234/tab-complete-input-vue'
      }
    ]
  },
  chainWebpack: (config) => {
    // TODO: https://github.com/vuejs/vuepress/issues/1623 - Support IE 10-11
    //

    // This is for @vue/babel-preset-app, or it will 'forget' to inject
    // the most primitive polyfills required by Vue (IE 10/11 support).
    //
    process.env.VUE_CLI_ENTRY_FILES = JSON.stringify(
      config.entry('app').values()
    )

    // Get existing js rule exclude function
    //
    let existingExcludes = config.module.rule('js').exclude.values()

    // Add rule to always transpile auto-generated sources in .temp
    //
    config.module
      .rule('js')
      .exclude.clear()
      .add(filePath => {
        const tempPath = config.resolve.alias.get('@temp')
        const clientPath = config.resolve.alias.get('@client')
        if (filePath.startsWith(tempPath) || filePath.startsWith(clientPath)) {
          return false
        } else {
          for (let i = 0; i < existingExcludes.length; i++) {
            let returnedValue = existingExcludes[i](filePath)
            if (returnedValue !== undefined) return returnedValue
          }
        }
      })
  }
}
