import Vue from "vue"
const modulesFiles = require.context("./modules", false, /.js$/)
modulesFiles.keys().forEach((modules) => {
  const value = modulesFiles(modules)
  value.default(Vue)
})

