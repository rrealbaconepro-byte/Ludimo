import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import dotenv from "dotenv";

dotenv.config();

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

// Note: Analytics only works in the browser, not on the server
// const analytics = getAnalytics(firebaseApp);

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // put your frontend files in /public

// Health check (Render uses this)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "Ludimo" });
});

// Example API route
app.get("/api/status", (req, res) => {
  res.json({
    message: "Ludimo server is running",
    firebaseProject: firebaseConfig.projectId
  });
});

// Fallback for SPA
app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(PORT, () => {
  console.log(`Ludimo server running on port ${PORT}`);
});
