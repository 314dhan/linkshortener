const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const Url = require('../models/url.model');

exports.shortenUrl = (req, res) => {
    const { originalUrl } = req.body;
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;

    if (!validUrl.isUri(originalUrl)) {
        return res.status(400).render('index', { error: 'Invalid URL', shortUrl: null });
    }

    try {
        let url = Url.findByOriginalUrl(originalUrl);

        if (url) {
            res.render('index', { shortUrl: url.shortUrl, error: null });
        } else {
            const urlCode = nanoid(7);
            const shortUrl = `${baseUrl}/${urlCode}`;

            const newUrl = {
                originalUrl,
                shortUrl,
                urlCode,
                clicks: 0,
                createdAt: new Date()
            };

            Url.save(newUrl);

            res.render('index', { shortUrl: shortUrl, error: null });
        }
    } catch (err) {
        console.error(err);
        res.status(500).render('index', { error: 'Server error', shortUrl: null });
    }
};

exports.redirectUrl = (req, res) => {
    try {
        const url = Url.findByCode(req.params.code);

        if (url) {
            url.clicks++;
            Url.update(url);
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).send('No URL found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};