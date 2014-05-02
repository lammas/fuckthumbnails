var express = require('express');
var router = express.Router();
var walk = require('walk');
var path = require('path');

var config = require('../config');


/** Index page */
function viewIndex(req, res) {
	res.render('index', { title: config.title });
}


router.get('/', viewIndex);
router.get('/g/*', viewIndex);


/** gallery.json */
function generateListing(req, res, callback) {
	var dataPath = 'public/data';
	var staticPath = 'public';

	var filter = /^Thumbs.db|^\.[a-zA-Z0-9]+/;
	var files   = {};

	var walker  = walk.walk(dataPath, { followLinks: false });

	walker.on('directories', function (root, dirStatsArray, next) {
		next();
	});

	walker.on('file', function(root, stat, next) {
		if (stat.name.match(filter) != null) {
			return next();
		}

		var dir = root.replace(dataPath, '');
		if (dir.length==0) {
			dir = ".";
		}
		else {
			dir = dir.substring(1);
		}

		if (!(dir in files)) {
			files[dir]=[];
		}

		var file = {
			'path': path.join(root.replace(staticPath, ''), stat.name),
			'time': stat.mtime
		};
		files[dir].push(file);
		return next();
	});

	walker.on('end', function() {
		for (var dir in files) {
			files[dir].sort(function(a, b) {
				if (a.time > b.time) return -1;
				if (a.time < b.time) return 1;
				return 0;
			});
		}
		req.galleryData = files;
		callback();
	});
}

router.get('/gallery.json', generateListing, function(req, res) {
	if (!req.galleryData) {
		res.json({});
		return;
	}
	res.json(req.galleryData);
});

module.exports = router;
