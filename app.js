const express = require('express')
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
    const chosenUser = "";
    for (let i =0; i < usersArray.length; i++) {
        if (usersArray[i].id == id) {
            console.log(usersArray[i]);
            chosenUser = usersArray[i]
        }
    }
    res.send(chosenUser); // לא הספקתי לסיים
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
