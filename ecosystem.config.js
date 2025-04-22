module.exports = {
  apps : [
    {
      name   : "back-end",
      script : "back-end/official_joke_api/index.js"
    },
    {
      name: 'nuxt-app',
      cwd: './front-end/nuxt-app/',
      script: 'npm',
      args: 'run dev'
    },
    {
      name: 'vue-app',
      cwd: './front-end/vue-app/',
      script: 'npm',
      args: 'run dev'
    }
  ]
}
