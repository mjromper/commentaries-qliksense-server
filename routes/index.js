var express = require('express');
var router = express.Router();
var db = require('../db.js');
var path = require('path');



//Database
router.get('/comments', db.processGetAllComments );
router.post('/comments', db.processNewComment );
router.get('/comments/:id', db.processGetComment );
router.post('/comments/:id', db.processUpdateCreateComment );
router.delete('/comments/:id', db.processDelete );

module.exports = router;