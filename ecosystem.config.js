module.exports = {
  apps: [
    {
      script: './dist/main.js',
      watch: false,
      exec_mode: 'cluster',
      name: 'nest-ecommerce',
      cwd: '/apps/backends/nest-ecommerce',
      instances: 'max',
      max_memory_restart: '500M',
      autorestart: true,
      env: {
        NODE_ENV: 'production',
        PORT: 5003,
      },
    },
  ],
};