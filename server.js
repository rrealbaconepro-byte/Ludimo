
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const maintenancePage = `<!DOCTYPE html>
<html>
<head>
<meta name="robots" content="noarchive, noodp, noydir">
<meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="expires" content="0">
<title>503 Service Unavailable</title>
</head>
<body>
<h1>503 Service Unavailable</h1>
No server is available to handle this request.
<hr>
<address>Apache/2.4.52 (Ubuntu) Server at ludimo.de5.net Port 443</address>
</body>
</html>`;

app.use((req, res) => {
    res.status(503);

    res.set({
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "Retry-After": "3600"
    });

    res.send(maintenancePage);
});

app.listen(PORT, () => {
    console.log(`Maintenance page running on port ${PORT}`);
});
