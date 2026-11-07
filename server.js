import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBTMZGd3zCBsf8OaHsDW8LHqTxegqUF4ww",
  authDomain: "ludimo-2d3ae.firebaseapp.com",
  projectId: "ludimo-2d3ae",
  storageBucket: "ludimo-2d3ae.firebasestorage.app",
  messagingSenderId: "229714978642",
  appId: "1:229714978642:web:d9df65ea75f666dea8bc8b",
  measurementId: "G-N83VLBHX2T"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

app.use(cors());
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Health check for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "Ludimo" });
});

// Explicitly serve index.html on the root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Fallback for SPA / any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Ludimo server running on port ${PORT}`);
});
