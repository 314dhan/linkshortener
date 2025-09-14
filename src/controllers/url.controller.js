const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../data/db.json');

// Helper function to read the database
const readDb = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or is empty, return empty array
        return [];
    }
};

// Helper function to write to the database
const writeDb = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

exports.shortenUrl = (req, res) => {
    const { originalUrl } = req.body;
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;

    if (!validUrl.isUri(originalUrl)) {
        return res.status(400).render('index', { error: 'Invalid URL', shortUrl: null });
    }

    try {
        const urls = readDb();
        let url = urls.find(u => u.originalUrl === originalUrl);

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

            urls.push(newUrl);
            writeDb(urls);

            res.render('index', { shortUrl: shortUrl, error: null });
        }
    } catch (err) {
        console.error(err);
        res.status(500).render('index', { error: 'Server error', shortUrl: null });
    }
};

exports.redirectUrl = (req, res) => {
    try {
        const urls = readDb();
        const url = urls.find(u => u.urlCode === req.params.code);

        if (url) {
            url.clicks++;
            writeDb(urls);
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).send('No URL found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};