const express = require('express')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const app = express()
const port = 3000

app.use(express.json())
app.get('/', (req, res) => {
    res.send('hello to everyone')
})

app.get('/allUsers', (req, res) => {
    for (let i = 0; i < usersArray.length; i++) {
        console.log(usersArray[i]);
    }
    res.send(usersArray);
})

app.get('/oneUser/:id', (req,res) => {
    const id = req.params.id;
    let chosenUser = "";
    for (let i = 0; i < usersArray.length; i++) {
        if (id === usersArray[i].id) {
            chosenUser = usersArray[i]
        }
    }
    res.send(chosenUser);
})

app.post('/addUser', (req, res) => {
    let len = usersArray.length;
    const newId = uuidv4();
    const newEmail = req.body.email;
    const userPassword = req.body.password;
    const saltRounds = 10;
    bcrypt.hash(userPassword, saltRounds)
    .then((newPassword) => {
        for (let i =0; i < len; i++) {
            if (newId === usersArray[i].id) return ("ERROR: the id is allready exist");
            const newUser = {
                id: newId,
                email: newEmail,
                password: newPassword
            };
            usersArray.push(newUser);
            res.send(usersArray)
        }
    })
    .catch(err => console.log(err))
})

app.put('/editUser/:id', (req, res) => {
    const id = req.params.id;
    const newId = uuidv4();
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const saltRounds = 10;
    bcrypt.hash(newPassword, saltRounds)
    .then((hash) => {
        for (i = 0; i < usersArray.length; i++) {
            if (newId !== usersArray[i].id) {
                if (id === usersArray[i].id) {
                    usersArray[i].id = newId;
                    usersArray[i].email = newEmail;
                    usersArray[i].password = hash;
                }
            } else {
                res.send("ERROR: the new id is allready exists in the array")
            }
        }
    })
    res.send(usersArray)
})

app.delete('/deleteUser/:id', (req,res) => {
    const id = req.params.id;
    let deleteIndex = 0;
    for (let i = 0; i < usersArray.length; i++) {
        if (id === usersArray[i].id) { 
            deleteIndex = i;  
        }
    }
    usersArray.splice(deleteIndex,1);
    res.send(usersArray)
})

app.post('/checkDetails', (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    let count = 0;
    for (let i = 0; i < usersArray.length; i++) {
        if(usersArray[i].email === userEmail) {
            const hashPassword = usersArray[i].password;
            bcrypt.compare(userPassword, hashPassword)
            .then((flag) => {
                if (flag) count++;
            })      
        }  // worked without hash, not working with hash. need to fix it.
    }
    if (count > 0) res.send("User is connected");
    else res.send("Wrong credentials");
})

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
})


let usersArray = [
    {
        id: "1",
        email: "avi@123",
        password: "123456"
    },
    {
        id: "2",
        email: "shimi@123",
        password: "654321"
    },
    {
        id: "3",
        email: "levi@123",
        password: "7891011"
    }
]





