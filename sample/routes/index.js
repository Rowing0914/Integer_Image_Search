var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var runPython = function() {
	var PythonShell = require('python-shell');
	PythonShell.run('./python/img_saver.py', function (err) {
	  console.log('finished');
	});
}

// getting get request
router.use(bodyParser.json());
router.get('/trainAgain', (req, res) => {
	res.send('wait')
	runPython()
	res.send('done')
});

module.exports = router;