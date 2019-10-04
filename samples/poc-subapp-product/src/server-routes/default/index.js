/* @jsx createElement */

import { IndexPage, createElement, Token, Require, Literal } from "subapp-server/template";

const Template = (
  <IndexPage DOCTYPE="html">
    <Token _id="INITIALIZE" />
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        />
        <Token _id="META_TAGS" />
        <Token _id="PAGE_TITLE" />
        <Require _id="subapp-web/lib/init" />

        <Token _id="CRITICAL_CSS" />

        <style>
          <Literal file={`${__dirname}/style.css`} />
        </style>
      </head>
      <Token _id="HEAD_CLOSED" />
      <body>
        <noscript>
          <h4>JavaScript is Disabled</h4>
          <p>Sorry, this webpage requires JavaScript to function correctly.</p>
          <p>Please enable JavaScript in your browser and reload the page.</p>
        </noscript>

        <Require
          _id="subapp-web/lib/load"
          _concurrent
          timestamp
          elementId="subapp-header"
          name="Header"
        />

        <Require
          _id="subapp-web/lib/load"
          _concurrent
          timestamp
          elementId="subapp-shipping"
          name="Shipping"
        />

        <Require
          _id="subapp-web/lib/load"
          _concurrent
          timestamp
          elementId="subapp-navigation"
          name="Navigation"
        />

        <Require
          _id="subapp-web/lib/load"
          _concurrent
          timestamp
          elementId="subapp-breadcrumbs"
          async
          name="Breadcrumbs"
        />

        <Require
          _id="subapp-web/lib/load"
          _concurrent
          timestamp
          elementId="subapp-product"
          name="Product"
          serverSideRendering
        />

        <Require _id="subapp-web/lib/start" />

        {/* <Require _id="subapp-web/lib/more-data" _concurrent name="MainBody" /> */}
      </body>
      <Token _id="BODY_CLOSED" />
    </html>
    <Token _id="HTML_CLOSED" />
  </IndexPage>
);

export default Template;
