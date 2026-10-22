// server.js - The Backend Brain of EcoSync
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware (Allows your frontend app screen to talk to this server safely)
app.use(cors());
app.use(express.json());

// Virtual Database simulating RNTU's active environmental statistics
let rntuCampusData = {
    treesPlanted: 1420,
    greenCoverPercentage: 85,
    dailyCarbonOffsetKg: 340
};

// ROUTE 1: Sends current campus stats to the frontend when the app opens
app.get('/api/sustainability', (req, res) => {
    res.json(rntuCampusData);
});

// ROUTE 2: Receives updates when a student logs a new tree plantation event
app.post('/api/log-tree', (req, res) => {
    const { quantity } = req.body; // Captures the number of trees entered by the user

    if (!quantity || quantity <= 0) {
        return res.status(400).json({ error: "Please enter a valid number of trees." });
    }

    // Process the math: Add to total trees and calculate new carbon offsets
    rntuCampusData.treesPlanted += parseInt(quantity);
    rntuCampusData.dailyCarbonOffsetKg += (quantity * 0.24); // Assuming 0.24kg carbon offset per young tree daily
    
    res.json({
        message: "EcoSync Database Updated Live!",
        updatedData: rntuCampusData
    });
});

// Start listening for app requests
app.listen(PORT, () => {
    console.log(`🚀 EcoSync Backend Engine is running smoothly on http://localhost:${PORT}`);
});
