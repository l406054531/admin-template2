module.exports = {
    presets: [
        '@vue/app'
    ],
    sourceType: 'unambiguous',
    'env': {
        'development': {
            'plugins': ['dynamic-import-node']
        }
  },
  plugins: [
    // 这块是增加的prismjs的配置
    [
      "prismjs",
      {
        languages: ["javascript", "css", "markup"],
        plugins: ["line-numbers"],
        // theme: "twilight",
        css: true
      }
    ]
  ]
}