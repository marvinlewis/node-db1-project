const express = require('express');
const db = require('../data/dbConfig.js');
const router = express.Router();

router.get('/', (req, res) => {
    db.select('*')
    .from('accounts')
    .then(Response => {
        console.log(res)
        res.status(200).json({ data : Response })
    })
    .catch(err => {res.status(500).json({error : 'error'})})
})

router.get('/:id', (req, res) => {
    db.select('*')
    .from('accounts')
    .where({ id : req.params.id})
    .then(post => {
        res.status(200).json({data : post})
    })
    .catch(err => res.status(400).json({error : 'error gettin ID'}))
    
})

router.post('/', (req, res) => {
    const postBody = req.body;
    db('accounts', "id")
    .insert(postBody)
    .then(ids => {
        console.log(ids);
        const id = ids[0];
        db('accounts')
        .where({ id })
        .first()
        .then(post => {
            res.status(200).json({ data : post})
        })
    })
    .catch(err => {
        res.status(400).json({error : 'error posting'})
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body
    db('accounts')
    .where({ id })
    .update(changes)
    .then(change => {
        res.status(200).json({ data : change,
        message : 'record updates'})
    })
    .catch(err => {
        res.status(400).json({ error : "couldnt update records"})
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
    .where({id})
    .del()
    .then(item => {
        res.status(200).json({data : item})
    })
    .catch(err => {
        res.status(400).json({error : 'couldnt delete'})
    })
})


module.exports = router;