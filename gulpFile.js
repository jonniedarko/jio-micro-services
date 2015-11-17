
var gulp = require('gulp');
var env = require('gulp-env');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

gulp.task('serve', [], function () {
	nodemon({
		script: "node_modules/jio-blog/index.js",
		env: {
			NODE_ENV: 'development',
			PORT: '3000',
			MONGO: 'mongodb://localhost:27017/blog'
		},
		nodeArgs: ['--debug']
	});
});

gulp.task('test', function (done) {
	env({
		vars: {
			NODE_ENV: 'testing',
			PORT: 3001,
			MONGO: 'mongodb://localhost:27017/blog-test'
		}
	});

	var gulpStream = gulp
		.src('test/**/*.spec.js')
		.pipe(mocha({
			bail: false,
			reporter: 'spec'
		}));

	gulpStream.on('error', function (err) {
		done(err);
		process.exit();
	});

	gulpStream.on('end', function () {
		done();
		process.exit();
	});


});
