
const express = require('express');
const ObjectID = require('mongodb').ObjectID

const createRouter = function (collection) {

    const router = express.Router();


    // INDEX, get all sightings from MongoDB, and serve as JSON..

    router.get('/', (req, res) => {
        collection.find().toArray()
        .then((docs) => {res.json(docs)})
        .catch((err) => {
            console.error(err);
            res.status(500);
            res.json({ status: 500, error: err })
        })    
    });


    // SHOW, get a sighting from MongoDB, via an ID, and serve as JSON..

    router.get('/:id', (req, res) => {
        const id = req.params.id;
        collection.findOne({ _id: ObjectID(id)})
        .then((doc) => res.json(doc))
        .catch((err) => {
            console.error(err);
            res.status(500);
            res.json({ status: 500, error: err })
        })   
    });


    // CREATE, Post new sighting, and persist to the database..

    // Note.. To parse the req.'body' requires, 'app.use(express.json());' in the head of your server..

    router.post('/', (req, res) => {
        const newData = req.body;
        collection.insertOne(newData)
        .then((result) => {res.json(result.ops[0])})
        .catch((err) => {
            console.error(err);
            res.status(500);
            res.json({ status: 500, error: err })
        })    
    });


return router;

};

module.exports = createRouter;

