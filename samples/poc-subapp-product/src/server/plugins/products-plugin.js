import { fetchJSON } from "@walmart/electrode-fetch";

function getServiceEndpoint(type) {
  return `https://www.walmart.com/terra-firma/fetch?rgs=${type}`;
}

const plugin = {
  name: "productsPlugin",
  version: "0.0.1",
  async register (server, options) {
    server.route({
      method: "GET",
      path: `${options.apiBase ? options.apiBase : "/api/"}review`,
      handler: (req) => {
        return fetchJSON(getServiceEndpoint("REVIEWS_MAP"), {
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
          return fetchJSON(getServiceEndpoint("PRODUCT"), {
              body: JSON.stringify({
                btvId: req.query.itemId,
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
