const express = require('express');
const app = express();
const port = 3000;

app.get('/api/data', (req, res) => {
    res.json({ message: "Hello from the Node.js API!" });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
