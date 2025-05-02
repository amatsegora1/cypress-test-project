const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
    env: {
      email: 'test9802@example1.com',
      password: '123456789Bb'
    }
  }
});