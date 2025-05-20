const express = require('express'); const router = express.Router(); // Placeholder route router.get('/', (req, res) => { res.json({ message: 'Demo API is working!' }); }); module.exports = router;
