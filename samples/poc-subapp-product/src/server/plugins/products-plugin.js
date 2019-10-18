import { fetchJSON } from "@walmart/electrode-fetch";

const SERVICE_ENDPOINT = "https://www.walmart.com/terra-firma/fetch?rgs=REVIEWS_MAP";

const plugin = {
  name: "productsPlugin",
  version: "0.0.1",
  async register (server, options) {
    server.route({
      method: "GET",
      path: `${options.apiBase ? options.apiBase : "/api/"}review`,
      handler: (req) => {
        return fetchJSON(SERVICE_ENDPOINT, {
            body: JSON.stringify({
              itemId: req.query.itemId,
              "paginationContext": {},
              "postalAddress": {},
              "storeFrontIds": []
            }),
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            }
          });
      }
    });

    server.route({
        method: "GET",
        path: `${options.apiBase ? options.apiBase : "/api/"}product`,
        handler: (req) => {
          return fetchJSON(SERVICE_ENDPOINT, {
              body: JSON.stringify({
                btvId: req.query.btvId,
                "paginationContext": {},
                "postalAddress": {},
                "storeFrontIds": []
              }),
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
              }
            });
        }
      });
    }
};

export default plugin;
