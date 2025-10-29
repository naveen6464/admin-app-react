const config = {
  localhost: {
    url: "http://localhost:8031/",
    adminUrl: "http://localhost:3031/",
    apiUrl: "http://localhost:7001/api/tecosoft-admin/",
    username: "adminLocalUser",
  },
  develop: {
    url: "http://localhost:8031/",
    adminUrl: "http://localhost:3031/",
    apiUrl: "https://ujkc1bts7i.execute-api.us-west-2.amazonaws.com/dev/",
    username: "adminDevUser",
  },
  staging: {
    url: "http://localhost:8031/",
    adminUrl: "http://localhost:3031/",
    apiUrl: "http://localhost:8000/dev/",
    username: "adminStageUser",
  },
  production: {
    url: "",
    event_url: "",
    apiUrl: "",
    username: "adminProdUser",
  },
};

const environment = "localhost";

const hostConfig = {
  WEB_URL: config[environment].url,
  ADMIN_URL: config[environment].adminUrl,
  API_URL: config[environment].apiUrl,
  USERNAME: `${config[environment].username}`,
};

module.exports = {
  hostConfig,
};
