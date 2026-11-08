import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all static files (html, css, js, images, etc.)
app.use(express.static(__dirname));

// Health check (for Render)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "Ludimo" });
});

// ========== Main Pages ==========
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.get("/register.html", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.get("/play", (req, res) => {
  res.sendFile(path.join(__dirname, "play.html"));
});

app.get("/play.html", (req, res) => {
  res.sendFile(path.join(__dirname, "play.html"));
});

app.get("/shop", (req, res) => {
  res.sendFile(path.join(__dirname, "shop.html"));
});

app.get("/shop.html", (req, res) => {
  res.sendFile(path.join(__dirname, "shop.html"));
});

app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "user.html"));
});

app.get("/user.html", (req, res) => {
  res.sendFile(path.join(__dirname, "user.html"));
});

app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "user.html"));
});

app.get("/download", (req, res) => {
  res.sendFile(path.join(__dirname, "download.html"));
});

app.get("/download.html", (req, res) => {
  res.sendFile(path.join(__dirname, "download.html"));
});

app.get("/upgrade", (req, res) => {
  res.sendFile(path.join(__dirname, "upgrade.html"));
});

app.get("/upgrade.html", (req, res) => {
  res.sendFile(path.join(__dirname, "upgrade.html"));
});

// ========== Fallback ==========
// Try to serve the requested file, otherwise go to index.html
app.get("*", (req, res) => {
  const filePath = path.join(__dirname, req.path);

  res.sendFile(filePath, (err) => {
    if (err) {
      // Try adding .html
      res.sendFile(path.join(__dirname, req.path + ".html"), (err2) => {
        if (err2) {
          res.sendFile(path.join(__dirname, "index.html"));
        }
      });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Ludimo server running on port ${PORT}`);
  console.log(`Serving files from: ${__dirname}`);
});
