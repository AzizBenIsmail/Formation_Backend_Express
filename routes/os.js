var express = require('express');
var router = express.Router();
const osController = require('../Controller/osController');
/* GET home page. */
router.get('/os', osController.getOsInformation ); //affichage 
router.get('/osCpus',osController.osCpus)
router.get('/osCpusById/:id',osController.osCpusById)
//router.post('/os', ); //ajouter
//router.put('/os', ); //modifier
//router.delete('/os', ); //supression

module.exports = router;
