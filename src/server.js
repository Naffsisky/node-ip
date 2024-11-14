// src/server.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Simulate load with a delay
app.get("/", (req, res) => {
  const delay = Math.floor(Math.random() * 3000); // Random delay to simulate processing
  setTimeout(() => {
    res.send(`Response from server at port ${process.env.PORT}, delay: ${delay}ms`);
  }, delay);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
