const port = 3000;

// Call express
const express = require("express");
const app = express();

// Call body-parser.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Call fs for writing JSON file.
const fs = require('fs');
let projectFile = fs.readFileSync('data.json');
let data = JSON.parse(projectFile)
let projects = data.projects

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

// Rendering the home page.
try {
    // Home
    app.get('/', (req, res) => {
        res.render('index', { projects });
        req.on('error', (error) => console.error(`Warning: An error occurred. \nError Code: ${error.code}`));
    });

    // About
    app.get('/about', (req, res) => {
        res.render('about');
        req.on('error', (error) => console.error(`Warning: An error occurred. \nError Code: ${error.code}`));
    });

    // Project
    app.get('/project/:id', (req, res, next) => {
        var id = req.params.id;
        res.render('project', { projects, id });
        req.on('error', (error) => console.error(`Warning: An error occurred. \nError Code: ${error.code}`));
    });


    // Adding middleware to handle 404 codes.
    app.use((req, res, next) => {
        const err = new Error('Warning: Page Not Found. Please check whether the URL is correct. \nError Code: 404')
        err.status = 404;
        next(err);
    })

} catch (error) {
    console.error("error.message");
}

// Listening for the port.
app.listen(port, () => {
    console.log(`The application is listening on port ${port}`);
})