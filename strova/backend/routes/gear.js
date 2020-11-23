const router = require('express').Router();
let Gear = require('../models/gear.model');

router.route('/').get((req, res) => {
    Gear.find()
    .then((gear) => res.json(gear)) // FLAG
    .catch(err => res.status(400).json('Error: ' + err));
}); // This endpoins handles HTTP GET requests on /users/URL Path
    // We call users.find() to get a list of users from the database
    //The results are returned in the JSON format with res.json(users)

router.route('/add').post((req, res) => {
    const gearName = req.body.gearName;
    const gearType = req.body.gearType;

    const newGear = new Gear({
        gearName,
        gearType
    
    });

    newGear.save()
    .then(()=> res.json('Gear added!'))
    console.log(JSON.stringify(newGear))
    .catch(err => res.status(400).json('Error: ' + err));
}); // this 2nd endpoint handles the incoming HTTP POST requests on /users/add/URL path
    // after getting the username we create a new instance of User.

module.exports = router;

//following code added after API TESTING

// this /:id GET endpoint returns a preexsisting gear
router.route('/:id').get((req, res) => {
    Gear.findById(req.params.id)
    .then(gear => res.json(gear))
    .catch(err => res.status(400).json('Error: not found by ID: ' + err));
});

// this /:id DELTE endpoint deletes a preexsisting gear
router.route('/:id').delete((req, res) => {
    Gear.findByIdAndDelete(req.params.id)
    .then(() => res.json('Gear deleted!'))
    .catch(err => res.status(400).json('Error: not deleted' + err));
});

// this /update/:id POST endpoint updates an exsisting items
// for this endpoint retrives the old gear item based on the id
// then we set gear propert values to what's available
// finally we call save to update the database object
router.route('/update/:id').post((req, res) => {
    Gear.findById(req.params.id)
        .then(gear => {
            gear.gearName = req.body.gearName;
            gear.gearType = req.body.gearType; gear.save()
                .then(() => res.json('Gear updated!'))
                .catch(err => res.status(400).json('Error: Not Updated' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});