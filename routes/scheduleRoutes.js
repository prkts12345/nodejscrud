const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
    res.render('index')
})

Router.get('/addschedule', (req, res) => {
    res.render('addschedule');
})

Router.get('/list', (req, res) => {
    res.render('list')
})

module.exports = Router;