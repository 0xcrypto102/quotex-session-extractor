require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let userSessions = {}; // Store ssid against Telegram user ID

app.post("/api/store_ssid", (req, res) => {
    const { telegram_id, ssid } = req.body;
    if (!telegram_id || !ssid) {
        return res.status(400).json({ error: "Invalid request" });
    }

    userSessions[telegram_id] = ssid;
    console.log(`Stored SSID for user ${telegram_id}: ${ssid}`);

    res.json({ success: true, message: "SSID stored successfully" });
});

app.get("/api/get_ssid/:telegram_id", (req, res) => {
    const ssid = userSessions[req.params.telegram_id];
    if (!ssid) return res.status(404).json({ error: "SSID not found" });

    res.json({ ssid });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
