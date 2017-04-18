var Datastore = require('nedb'),
    path = require('path');

var db = {};
db.comments = new Datastore( path.resolve(__dirname,'comments.db') );
db.comments.loadDatabase();

//db.settings.persistence.setAutocompactionInterval(60000);


function _processGet( dbName, req, res ) {
    var sheetId = req.query.sheetId,
        anchor = req.query.anchor;
    if ( sheetId ) {
        db[dbName].find( { "sheetId": sheetId, "anchor": anchor }).sort({ created: -1 }).exec( function(err, result) {
            if ( err ) {
                res.status(500).json( {success: false, error: err} );
            } else {
                res.status(200).json( result );
            }
        } );
    } else {
        res.status(400).json( { success: false, error: "sheetId or anchor param not found" } );
    }
}

function _processUpdateCreate ( dbName, req, res ) {
    var sheetId = req.body.sheetId,
        id = req.params.id;
    if ( sheetId ) {

        db[dbName].update( { "sheetId": sheetId, "_id": id } , req.body, {"upsert": true}, function(err, affected, affectedDocuments) {
            if (err){
                res.status(500).json( { success: false, error: err } );
            } else {
                res.status(200).json( {affected:affected, affectedDocuments:affectedDocuments} );
            }
        } );
    } else {
        res.status(400).json( { success: false, error: "SheetId Not found" } );
    }
}

function processNewComment (req, res ) {
    var sheetId = req.body.sheetId;
    if ( sheetId ) {

        db['comments'].insert( req.body, function(err, newDoc) {
            if (err){
                res.status(500).json( { success: false, error: err } );
            } else {
                res.status(200).json( newDoc );
            }
        } );
    } else {
        res.status(400).json( { success: false, error: "SheetId Not found" } );
    }
}

function processUpdateCreateComment( req, res ) {
    _processUpdateCreate("comments", req, res);
}

function processGetAllComments( req, res ) {
    _processGet("comments", req, res);
}



function nedb ( req, res ) {
    if ( !req.body || !req.body.collection || !req.body.filter || !req.body.method ) {
        res.status(400).json( {success: false, error: "Query params missing"} );
        return;
    }

    if ( req.body.method === "get" ){
        db[req.body.collection].find( req.body.filter , function(err, result) {
            if ( err ) {
                res.status(500).json( {success: false, error: err} );
            } else {
                res.status(200).json( result );
            }
        } );
    } else if ( req.body.method === "delete" ) {
        db[req.body.collection].remove( req.body.filter, { multi: true }, function (err, numRemoved) {
            if ( err ) {
                res.status(500).json( {success: false, error: err} );
            } else {
                res.status(200).json( numRemoved );
            }
        });
    }
}

function processDelete ( req, res ) {
    var id = req.params.id;
    if ( id ) {

        db['comments'].remove({ _id: id }, {}, function (err, numRemoved) {
            if ( err ) {
                res.status(500).json( {success: false, error: err} );
            } else {
                res.status(200).json( {success: true, numRemoved: numRemoved} );
            }
        });

    } else {
        res.status(400).json( { success: false, error: "Id Not found" } );
    }
}

exports.processUpdateCreateComment = processUpdateCreateComment;
exports.processGetAllComments = processGetAllComments;
exports.processNewComment = processNewComment;
exports.processDelete = processDelete;
exports.processGetComment = function( req, res ){
    var id = req.params.id;
    if ( id ) {
        db['comments'].findOne( { "_id": id } , function(err, result) {
            if ( err ) {
                res.status(500).json( {success: false, error: err} );
            } else {
                res.status(200).json( result );
            }
        } );
    } else {
        res.status(400).json( { success: false, error: "Id Not found" } );
    }
};
exports.nedb = nedb;