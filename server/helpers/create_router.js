
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


return router;

};

module.exports = createRouter;

