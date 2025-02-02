require('dotenv').config();
const express = require('express');
const path = require("node:path");
const manager = require('./manager');

const app = express();

const PORT = process.env.PORT || 80;

app.use('/', express.static(path.join(__dirname, 'static')));

manager.load();

app.get('/:category?', (req, res) => {
    console.log("-----");
    console.time('Using a time for a request');
    const { category } = req.params;

    let gif;
    if (!category) {
        gif = manager.random();
        res.status(400).redirect(gif);
        console.log('Was used a random gif!');
        console.timeEnd('Using a time for a request');
        return;
    }

    gif = manager.randomFrom(category);
    if (gif == null) {
        res.status(200).send('Gif was not found!');
        console.timeEnd('Using a time for a request');
        return;
    }

    res.status(200).redirect(gif);
    console.log(`Was used a random gif from category ${category}`)
    console.timeEnd('Using a time for a request');
})

app.listen(PORT, () => {
    console.log(`HTTP server listening on port ${PORT}`);
})
