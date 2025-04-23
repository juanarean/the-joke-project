module.exports = {
  apps: [
    {
      name: "back-end",
      script: "back-end/official_joke_api/index.js"
    },
    {
      name: 'vue-app',
      cwd: './front-end/vue-app/',
      script: 'npm',
      args: 'run dev'
    }
  ]
}
