module.exports = {
  apps : [
    {
      name   : "back-end",
      script : "back-end/official_joke_api/index.js"
    },
    {
      name: 'front-end',
      cwd: './front-end/', // Or a number of instances
      script: 'npm',
      args: 'run dev'
    }
  ]
}
