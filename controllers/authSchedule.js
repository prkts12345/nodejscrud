const mysql2 = require('mysql2');
const Router = require('../routes/scheduleRoutes');

//Create Datebase Connection
const db = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

//Checking Database connection
db.connect((err) => {
    if (err) console.log(`Error: ${err}`);

    else console.log(`Database connection success!`);
});

exports.login = async (req, res) => {
    try {

        const {email, password} = req.body;

        if (!email || !password ) {
            return res.status(400).render('index', {message: 'Provide email and password'});
        } 
        else db.query(`SELECT * from booking = ?`, async (err, result) => {

            if (email != email || password != password) {
                return response.status(401).render('login', { message: `Invalid email or password!` });
            }
            else {
                db.query(
                    `SELECT * from booking`, (err, result) =>{
                        res.render('list', {user: result, title: 'List of Scheduled'})
                    }
                )
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}


exports.addschedule = (req, res) => {

    const { id,destination_from, destination_to, departure_time, arrival_time } = req.body;

    // db.query('SELECT id FROM booking WHERE id = ?', id, (err, result) => {
    //     if (err) console.log(err)

        // if (result.length > 0) {
        //     return res.render('addcustomer', { message: 'Email entered is already in used!' })
        // }

        db.query(
            `INSERT INTO booking SET ?`, {
            id:id,
            destination_from: destination_from, 
            destination_to: destination_to,
            departure_time: departure_time, 
            arrival_time: arrival_time
        }, (err, result) => {
            if (err) console.log(err);

            else return res.render('addschedule', { message: 'Customer successfully added.' });
        }
        )
    //  });
}

exports.update_form = (req, res) => {
    const id = req.params.id; //passing a parameter
    
    db.query(`SELECT * FROM booking = ?`, [id], (err, result) => {
        res.render('updateform', { user: result})
    })
}

exports.update_user = (req, res) => {
    const { id, destination_from, destination_to, departure_time, arrival_time } = req.body;

    db.query(
        `UPDATE booking SET ? WHERE id = ?`, [{
        id,
        destination_from,
        destination_to,
        departure_time,
        arrival_time,
    },id], (err) => {
        if (err) return console.log(`Occured ${err}`);

        //  res.render('updateform', { message: 'User has been updated!' });
        
        db.query('SELECT * FROM booking ', (err, result) => {
                res.render('list', { user: result, title: 'List of Customers' })
            })
        
    });
}


exports.delete = (req, res) => {
    const id = req.params.id

    db.query(`DELETE FROM booking WHERE id = ?`, [id], (err, result) => {
        if (err) console.log(err);
        
        else {
            db.query('SELECT * FROM booking ', (err, result) => {
                res.render('list', { user: result, title: 'List of Users' })
            })
        }
    })
}