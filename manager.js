const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname, "static");

let categories = {
    all: []
}

async function load() {
    const directories = fs.readdirSync(basePath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    directories.forEach(dir => {
        const folderPath = path.join(basePath, dir);
        const gifs = fs.readdirSync(folderPath)
            .filter(file => file.endsWith(".gif"))
            .map(file => `/${dir}/${file}`);

        categories.all.push(...gifs);
        categories[dir] = gifs;
    });
}

const random = () => {
    const category = categories.all;
    if (category.length === 0) return null;
    return category[Math.floor(Math.random() * category.length)];
};

const randomFrom = name => {
    const category = categories[name];
    if (category === undefined || category.length === 0) return null;
    return category[Math.floor(Math.random() * category.length)];
};

module.exports = {
    load,
    random,
    randomFrom
};