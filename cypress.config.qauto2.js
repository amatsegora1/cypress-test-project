const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
    env: {
      email: 'test112233@test.com',
      password: '123456789Aa'
    }
  }
});