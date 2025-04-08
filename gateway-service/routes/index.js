const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const bodyParser = require("body-parser");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

//AUTH SERVICE
router.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://auth-service:4001",
    changeOrigin: true,
    logLevel: "debug",
  })
);

router.use(
  "/api/events",
  bodyParser.json(),
  createProxyMiddleware({
    target: "http://event-service:4002",
    changeOrigin: true,
    selfHandleResponse: false,
    onProxyReq: (proxyReq, req, res) => {
      if (req.body) {
        const bodyData = JSON.stringify(req.body);
        console.log("🧾 Gateway reenviando body:", bodyData);
        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
  })
);

module.exports = router;
