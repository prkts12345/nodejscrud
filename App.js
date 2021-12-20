const express = require('express');
const port = process.env.PORT || 4000;
const app = express();
const dotenv = require('dotenv');


dotenv.config({path: './.env'});
// app.engine('hbs', exphbs( {extname: '.hbs'}));
app.set('view engine', 'hbs');

// app.use(express.urlencoded({ extended: true }))
// app.use(express.json());

app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/scheduleRoutes'));



//running the server
app.listen(port, function (res, req) {
    console.log(`Server Run at ${port}`);
});