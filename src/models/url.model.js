const fs = require('fs');
const path = require('path');
const os = require('os');

const dbPath = process.env.VERCEL
  ? path.join(os.tmpdir(), 'db.json')
  : path.join(__dirname, '../../data/db.json');

// Ensure the db file exists in tmp directory for Vercel
if (process.env.VERCEL && !fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '[]', 'utf8');
}

const readDb = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If the file doesn't exist, create it with an empty array
        if (error.code === 'ENOENT') {
            writeDb([]);
            return [];
        }
        console.error('Error reading database:', error);
        return [];
    }
};

const writeDb = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const findByOriginalUrl = (originalUrl) => {
    const urls = readDb();
    return urls.find(u => u.originalUrl === originalUrl);
};

const findByCode = (urlCode) => {
    const urls = readDb();
    return urls.find(u => u.urlCode === urlCode);
};

const save = (url) => {
    const urls = readDb();
    urls.push(url);
    writeDb(urls);
    return url;
};

const update = (url) => {
    const urls = readDb();
    const index = urls.findIndex(u => u.urlCode === url.urlCode);
    if (index !== -1) {
        urls[index] = url;
        writeDb(urls);
        return url;
    }
    return null;
};

const clear = () => {
    writeDb([]);
};

module.exports = {
    findByOriginalUrl,
    findByCode,
    save,
    update,
    clear
};
// 