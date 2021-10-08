const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  if (process.env.DOCKER === "true") {
    app.use(
        '/api',
        createProxyMiddleware({
          target: "http://server:8080",
          changeOrigin: true,
        })
      );
  }
  else {
    app.use(
        '/api',
        createProxyMiddleware({
        target: "http://localhost:8080",
        changeOrigin: true,
        })
    );
}
};