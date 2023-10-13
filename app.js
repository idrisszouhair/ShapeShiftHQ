    /*  IMPORTS  */
const dotenv = require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const { log } = require('console');
const pool = require('./database');
const app = express();
const PORT = process.env.PORT || 7878;
const multer = require('multer');
const upload = multer({storage : multer.memoryStorage()});
const sharp = require('sharp');

    /* BODY PARSER */
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

    /*  SET VIEWS  */
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', './views')
app.set('layout', './layouts/layout');

    /*  STATIC FILES  */
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/javascript', express.static(__dirname + 'public/javascript'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/audio', express.static(__dirname + 'public/audio'));
app.use('/static', express.static('public'));
    
    /*  ROUTES  */
// DEFAULT
app.get('', (req, res) => {
    res.render('index', {title : 'ShapeShiftHQ'});
})
// INDEX
app.get('/index', (req, res) => {
    res.render('index', {title : 'ShapeShiftHQ'});
})
// OTHER PAGES
// GET MYSQL DATA OF SPORT CATEGORIES INTO HTML TABLE
app.get('/workout-plans', function(req, res){
    var sql = 'SELECT * FROM sportlist';
    pool.query(sql, function(error, result){
        if (error) throw error;
        res.render('workout-plans', {title: 'Workout Plans', sportlist : result});
    })
})

// ERROR PAGE
app.get('*', (req, res)=> {   
    res.send("404, Page not found");
})
    
    /*  POST  */
// POST NEW SPORT CATEGORY DATA INTO MYSQL
app.post('/', upload.single('sportImage'), function(req, res){
    var sport = req.body.sport;
    var sportImage = req.file.buffer.toString('base64');
    var sql = 'INSERT INTO sportlist VALUES(?, ?)';
    var values = [[sport, sportImage]];
    pool.query(sql, [values], function(err, result){
        if (err) throw err;
        console.log("Data Uploaded.");
        res.redirect('workout-plans');
    })
})








    /*  SERVER RUNNING ON ${PORT}   */  
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
})