var fs = require('fs'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    jest = require('jest-cli'),
    react = require('gulp-react'),
    webpack = require('gulp-webpack'),
    del = require('del'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    envify = require('envify'),
    source = require('vinyl-source-stream'),
    runSequence = require('run-sequence'),
    stylish = require('jshint-stylish');

var env = process.env.NODE_ENV;
var paths = {
    styles: ['client/src/styles/**/*.scss'],
    scripts: ['client/src/js/**/*.js'],
    assets: ['client/src/assets/**/*'],
    sprites: ['client/src/styles/sprites/**/*']
};

var dependencies = Object.keys(require('./package.json').dependencies);
var appModules = [
    'client/src/js/actions',
    'client/src/js/components',
    'client/src/js/dispatcher',
    'client/src/js/konstants',
    'client/src/js/mixins',
    'client/src/js/stores',
    'client/src/js/utils'
];

// https://gist.github.com/Sigmus/9253068
function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Error',
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end');
}

function bundleApp(watch) {
    var bundler = browserify({
        debug: env !== 'production',
        fullPaths: env !== 'production',
        transform: [reactify, envify],
        cache: {},
        packageCache: {},
        paths: [
            './client/src/js',
            './node_modules'
        ]
    })
    .external(dependencies)
    .add('./client/src/js/app.js');

    function rebundle() {
        var stream = bundler.bundle();
        return stream.on('error', handleErrors)
        .pipe(source('app.js'))
        .pipe(gulp.dest('./client/public/js/'));
    }

    bundler = watch ? watchify(bundler) : bundler;

    bundler.on('update', function() {
        var startTime = Date.now();
        gutil.log('Rebundling...');
        rebundle();
        gutil.log('Rebundled in ' + (Date.now() - startTime) + 'ms');
    });

    return rebundle();
}

gulp.task('bundle-vendor', function() {
    var bundle = browserify({
        debug: true,
        fullPaths: false
    }).require(dependencies).bundle();

    return bundle.on('error', handleErrors)
    .pipe(source('vendor.js'))
    .pipe(gulp.dest('client/public/js/'));
});

gulp.task('watchify', function() {
    return bundleApp(true);
});

gulp.task('bundle-app', function() {
    return bundleApp(false);
});

gulp.task('css', function() {
    return gulp.src('./client/src/styles/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('client/public/css'));
});

gulp.task('copy-assets', function() {
    return gulp.src(paths.assets)
    .pipe(gulp.dest('client/public/assets/'));
});

gulp.task('copy-sprites', function() {
    return gulp.src(paths.sprites)
    .pipe(gulp.dest('client/public/css/'));
});

gulp.task('nodemon', function() {
    return nodemon({
        script: 'server/main.js',
        ext: 'js html',
        ignore: __dirname + '/client/**/*.js',
    });
});

gulp.task('jshint', function() {
    gulp.src([
        'client/src/js/**/*.js'
    ])
    .pipe(react()
    .on('error', handleErrors))
    .pipe(jshint({
        browser: true,
        devel: false,
        globalstrict: true,
        es3: true,
        globals: {
            jest: true,
            it: true,
            beforeEach: true,
            expect: true,
            describe: true,
            require: true,
            module: true,
            Promise: true,
            React: true
        }
    }))
    .pipe(notify({
        message: function (file) {
            if (file.jshint.success) {
                return false;
            }

            var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                    return '\t' + data.error.line + ':' + data.error.character + ' ' + data.error.reason;
                }
            }).join('\n');

            return file.relative + '\n' + errors ;
        },
        title: "JS Hint Error"
    }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('uglify-vendor', function() {
    return gulp.src('client/public/js/vendor.js')
    .pipe(uglify({
        mangle: true
    }))
    .pipe(gulp.dest('client/dist/js/'));
});

gulp.task('uglify-app', function() {
    return gulp.src('client/public/js/app.js')
    .pipe(uglify({
        mangle: true
    }))
    .pipe(gulp.dest('client/dist/js/'));
});

gulp.task('uglify', ['uglify-app', 'uglify-vendor']);

gulp.task('minify', function() {
    return gulp.src('client/public/css/main.css')
    .pipe(minify({

    }))
    .pipe(gulp.dest('client/dist/css/'));
});

gulp.task('clean-public', function() {
    return del('client/public/**/*', function(err) {
        if (err) { gutil.log(err); }
    });
});

gulp.task('clean-dist', function() {
    return del('client/dist/**/*', function(err) {
        if (err) { gutil.log(err); }
    });
});

gulp.task('clean', ['clean-dist', 'clean-public']);

gulp.task('test', function(callback) {
    var onComplete = function (result) {
        if (result) {
        } else {
            gutil.log('!!! Jest tests failed! You should fix them soon. !!!');
        }
        callback();
    }

    jest.runCLI({}, __dirname + '/client/src/js', onComplete);
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['jshint']);
    gulp.watch(paths.styles, ['css']);
    gulp.watch(paths.assets, ['copy-assets']);
    gulp.watch(paths.sprites, ['copy-sprites']);
});

gulp.task('release', ['clean'], function(callback) {
    runSequence(
        'jshint',
        ['css', 'bundle-vendor', 'bundle-app'],
        ['uglify', 'minify'],
        callback
    );
});

gulp.task('build', function(callback) {
    runSequence(
        ['clean-public'],
        ['bundle-vendor', 'watchify', 'css'],
        callback
    );
});

gulp.task('default', ['build'], function(callback) {
    runSequence('watch', 'nodemon', 'jshint', callback);
});
