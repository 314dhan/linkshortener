const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url.controller');

// @route   GET /
// @desc    Render index page
router.get('/', (req, res) => {
    res.render('index', { shortUrl: null, error: null });
});

// @route   POST /shorten
// @desc    Create short URL
router.post('/shorten', urlController.shortenUrl);

// @route   GET /:code
// @desc    Redirect to long/original URL
router.get('/:code', urlController.redirectUrl);

module.exports = router;
