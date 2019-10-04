"use strict";

module.exports = {
  path: [
    "/",
    "/product/{productId}"
  ],
  pageTitle: "Product Page",
  // Specify the HTML index generation template
  // since using JSX template, don't include the extension
  // because babel transpiled it to .js in prod mode
  // but in dev mode we still need to be able to load the
  // .jsx version directly through @babel/register.
  templateFile: "index"
};
