module.exports = {
  apps: [
    {
      name: '2rang25',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
