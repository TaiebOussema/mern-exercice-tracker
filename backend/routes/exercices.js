const router = require("express").Router();
let Exercice = require("../models/exercice.model");


//GET
router.route("/").get((req, res) => {
    Exercice.find()
    .then(exercices => res.json(exercices))
    .catch(err => res.status(400).json("Error " + err));
});


//POST
router.route("/add").post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercice = new Exercice({
        username,
        description,
        duration,
        date
    });

    newExercice.save()
    .then(() => res.json("Exercice added !"))
    .catch(err => res.status(400).json("Error! " + err));

});

//DELETE
router.route("/:id").delete((req, res) => {
    Exercice.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercice deleted !"))
    .catch(err => res.status(400).json("Error ! " + err));
});

//UPDATE
router.route("/update/:id").post((req, res) => {
    Exercice.findById(req.params.id)
    .then(exercice => {
        exercice.username = req.body.username;
        exercice.description  = req.body.description;
        exercice.duration = req.body.duration;
        exercice.date = req.body.date
    })
    .catch(err => res.status(400).json("Error ! " + err));
});


module.exports = router;