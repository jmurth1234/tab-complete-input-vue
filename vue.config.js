module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/docs'
      ],
      useRenderEvent: false,
      headless: true,
      onlyProduction: true
    }
  }
};
