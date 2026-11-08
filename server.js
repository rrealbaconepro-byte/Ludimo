
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");

app.use((req, res) => {
  res.set({
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Retry-After": "3600",
    "Content-Type": "text/html; charset=utf-8"
  });

  res.status(503).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>503 Service Unavailable</title>
  <style>
    body {
      margin: 0;
      padding: 40px;
      background: #fff;
      color: #333;
      font-family: Arial, sans-serif;
    }
    h1 {
      font-size: 26px;
      font-weight: 400;
      border-bottom: 1px solid #ddd;
      padding-bottom: 15px;
    }
    p {
      font-size: 15px;
    }
    hr {
      border: 0;
      border-top: 1px solid #ddd;
      margin-top: 30px;
    }
    address {
      color: #777;
      font-size: 13px;
      font-style: normal;
    }
  </style>
</head>
<body>
  <h1>503 Service Unavailable</h1>
  <p>No server is available to handle this request.</p>
  <hr>
  <address>Apache/2.4.52 (Ubuntu) Server at ludimo.de5.net Port 443</address>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`Ludimo maintenance server running on port ${PORT}`);
});
