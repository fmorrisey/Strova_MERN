const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercise => res.json(exercise))
    //console.log(JSON.stringify(exercise))
    .catch(err => res.satus(400).json('Error: exercise not found' + err));
}); //error with too many ()

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const gearName = req.body.gearName;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        gearName,
        duration,
        date
    });

    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: exercise not saved ' + err));
});

module.exports = router;
//following code added after API TESTING

// this /:id GET endpoint returns a preexsisting exercise
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    //console.log(JSON.stringify(exercise))
    .catch(err => res.status(400).json('Error: not found by ID: ' + err));
});

// this /:id DELTE endpoint deletes a preexsisting exercise
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted!'))
    .catch(err => res.status(400).json('Error: not deleted' + err));
});

// this /update/:id POST endpoint updates an exsisting items
// for this endpoint retrives the old exercise item based on the id
// then we set exercise propert values to what's available
// finally we call save to update the database object
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.gearName = req.body.gearName;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date); exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: Not Updated' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});