const express = require('express');
const cors = require('cors');
const validation = require('./lib/middlewares/schemaValidation');
const userSchema = require('./models/user');
const contractSchema = require('./models/contract');
const itemSchema = require('./models/item');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json())

/**
 * Users
 */
app.post('/', validation(userSchema.userPostSchema), (req, res) => res.send({uid : 'To generate'}));
app.get('/', (req, res) => res.send({}))
app.put('/:uid', validation(userSchema.userPutSchema), (req, res) => res.send({uid : req.params.uid}))
app.delete('/:uid', validation(userSchema.userDeleteSchema), (req, res) => res.send({uid : req.params.uid}))

/**
 * Contracts
 */
app.post('/:uid/contracts', validation(contractSchema.contractPostSchema), (req, res) => res.send({uid : 'To generate'}));
app.get('/:uid/contracts', (req, res) => res.send({}))
app.put('/:uid/contracts/:cid', validation(contractSchema.contractPutSchema),  (req, res) => res.send({uid : req.params.uid, cid: req.params.cid}))
app.delete('/:uid/contracts/:cid', validation(contractSchema.contractDeleteSchema),  (req, res) => res.send({uid : req.params.uid, cid: req.params.cid}))

/**
 * Items
 */
app.post('/:uid/items', validation(itemSchema.itemPostSchema), (req, res) => res.send({uid: req.params.uid, iid: 'To generate'}));
app.get('/:uid/items', (req, res) => res.send({uid: req.params.uid, items: {}}));
app.put('/:uid/items/:iid', validation(itemSchema.itemPutSchema), (req, res) => res.send({uid: req.params.uid, iid: req.params.iid}))
app.delete('/:uid/items/:iid', validation(itemSchema.itemDeleteSchema), (req, res) => res.send({uid: req.params.uid, iid: req.params.iid}))

const port = 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
