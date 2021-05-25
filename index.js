const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt')
const fetch = require("node-fetch");
const data = require('./secure/data/data.json')

const port = process.env.port || 3000;
const relativePath = __dirname + "/static/";


app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));

//  No longer have a database to connect to!
// var connection = mysql.createConnection(
//   data
// );

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected to database!");  
// });

app.get('/', (req, res) => {
  res.sendFile("index.html");
});

app.get('/login', (req, res) => {
  res.sendFile(relativePath + "login.html");
});

app.post('/login', (req, res) => {
  console.log("\tLogin POST: ");
  query = 'SELECT username, hash FROM users WHERE username = ' + mysql.escape(req.body.name);
  connection.query(query, async (err, result) => {
    try {
      if (err) throw err;
      if (result && result.length) {
        bcrypt.compare(req.body.password, result[0].hash, (err, results) => {
          if (err) throw err
          if (results) {
            console.log("\t\t Logged In!");
            res.redirect('/loading');
          } else {
            console.log("\t\t- Wrong credentials!");
            res.redirect('/login');
          }
        });
      }
      else {
        console.log("\t\t- No user");
        res.redirect('/login');
      }
    }
    catch (e) {
      console.log("Error while logging user in!")
      console.log(e);
      res.redirect('/login');
    }
  });
})

app.get('/register', (req, res) => {
  res.sendFile(relativePath + "register.html");
});

app.post('/register', (req, res) => {
  console.log("\tRegister POST: ");
   // Query username to see if its already taken.
    query = 'SELECT username FROM users WHERE username = ' + mysql.escape(req.body.name);
    connection.query(query, async (err, result) => {
      try {
        if (err) throw err;
        if (result && result.length) {
          //  Username already in database.
          console.log("\t\t- Error: User already exists!")
          res.redirect('/register')
        }
        else {
          //  Create a user.
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          query = "INSERT INTO users (username, hash) VALUES ?"
          var values = [[
            req.body.name,
            hashedPassword
          ]]
          connection.query(query, [values], function(err) {
            if (err) throw err;
            console.log("\t\t- User added!");
          });
          res.redirect('/login')
        }
      }
      catch (e) {
        //  Something went wrong refresh.
        console.log("Error while registering user!")
        console.log(e)
        res.redirect('/register');
      }
    });
});

app.post('/debug', (req, res) => {
  res.redirect('/loading');
})

app.get('/loading', (req, res) => {
  res.sendFile(relativePath + "loading.html");
});

app.get('/error', (req, res) => {
  res.sendFile(relativePath + "error.html");
});

app.get('/game', (req, res) => {
  res.sendFile(relativePath + "game.html");
});

//  This should only be done when all sql queries are done.
// connection.end((err) => {
//   if (err) throw err;
//   console.log("\tConnection terminated!");
// });

app.get('*', (req, res) => {
  res.status(404).sendFile(relativePath + "error.html");
});

app.listen(port, () => {
  console.log('Server Started');
});