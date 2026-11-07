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

// Firebase config (kept from before)
const firebaseConfig = {
  apiKey: "AIzaSyBTMZGd3zCBsf8OaHsDW8LHqTxegqUF4ww",
  authDomain: "ludimo-2d3ae.firebaseapp.com",
  projectId: "ludimo-2d3ae",
  storageBucket: "ludimo-2d3ae.firebasestorage.app",
  messagingSenderId: "229714978642",
  appId: "1:229714978642:web:d9df65ea75f666dea8bc8b",
  measurementId: "G-N83VLBHX2T"
};

app.use(cors());
app.use(express.json());

// Serve EVERYTHING from the project root (html, js, css, images, etc.)
app.use(express.static(__dirname));

// Health check for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "Ludimo" });
});

// Explicit routes for common pages (optional but nice)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

// Fallback - if someone goes to any other route, try to serve the .html file
// or fall back to index.html
app.get("*", (req, res) => {
  const requestedPath = path.join(__dirname, req.path);

  // If the exact file exists, serve it
  if (req.path.endsWith(".html") || req.path.endsWith(".js") || req.path.endsWith(".css")) {
    return res.sendFile(requestedPath, (err) => {
      if (err) res.sendFile(path.join(__dirname, "index.html"));
    });
  }

  // Try adding .html
  res.sendFile(path.join(__dirname, req.path + ".html"), (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, "index.html"));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Ludimo server running on port ${PORT}`);
  console.log(`Serving all files from: ${__dirname}`);
});
