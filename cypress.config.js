const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "w7bwte",

  //   e2e: {
  //     setupNodeEvents(on, config) {
  //       // implement node event listeners here
  //     },
  //},
//   env: {
//     login_url: "http://localhost:8080",
//   },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
