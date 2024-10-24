
const dbConnect = require('./dbConfig');

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())



// GET Request
app.get('/employee', (req, res) => {
    dbConnect.query('SELECT * FROM user', (err, rows) => {
        if(err) {
            console.log(err)
        } else {
            console.log(rows)
            res.send(rows)
        }
    })
})

// GET Request only one
app.get('/employee/:id', (req, res) => {
    dbConnect.query('SELECT * FROM user WHERE id=?', [req.params.id], (err, rows) => {
        if(err) {
            console.log(err)
        } else {
            res.send(rows)
        }
    })
})



// DELETE Request
app.delete('/employee/:id', (req, res) => {
    dbConnect.query('DELETE FROM user WHERE id=?', [req.params.id], (err, rows) => {
        if(err) {
            console.log(err)
        } else {
            res.send(rows)
        }
    })
})



// INSERT Request -> POST
app.post('/employee', (req, res) => {
    var user = req.body 
    var userData = [user.name, user.age, user.address]
    dbConnect.query('INSERT INTO user(name, age, address) VALUES (?)',[userData] , (err, rows) => {
        if(err) {
            console.log(err)
        } else {
            res.send(rows)
        }
    })
})



// Update ; PATCH and PUT ; PATCH - only update some field; PUT - update all details

app.patch('/employee', (req, res) => {
    var user = req.body
    dbConnect.query('UPDATE user SET ? WHERE id='+user.id, [user], (err, rows) => {
        if(err) {
            console.log(err)
        } else {
            res.send(rows)
        }
    })
})



// PUT
app.put('/employee', (req, res) => {
    var user = req.body
    dbConnect.query('UPDATE user SET ? WHERE id='+user.id, [user], (err, rows) => {
        if(err) {
            console.log(err)
        } else {
            if(rows.affectedRows==0) {
                var user = req.body 
                var userData = [user.name, user.age, user.address]
                dbConnect.query('INSERT INTO user(name, age, address) VALUES (?)',[userData] , (err, rows) => {
                    if(err) {
                        console.log(err)
                    } else {
                        res.send(rows)
                    }
                })
            } else {
                res.send(rows)
            }
        }
    })
})




app.listen(3000, () => {
    console.log('Express running on port 3000')
})
