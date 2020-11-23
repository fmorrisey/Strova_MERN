const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then((users) => res.json(users)) // FLAG
    .catch(err => res.status(400).json('Error: ' + err));
}); // This endpoins handles HTTP GET requests on /users/URL Path
    // We call users.find() to get a list of users from the database
    //The results are returned in the JSON format with res.json(users)

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
    .then(()=> res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}); // this 2nd endpoint handles the incoming HTTP POST requests on /users/add/URL path
    // after getting the username we create a new instance of User.

module.exports = router;