var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var html2js = require('gulp-html2js');
var karma = require('karma').Server;

var paths = {
    scripts: ['src/main/javascripts/*.js',
              'src/main/javascripts/**/*.js'],
    dependencies: ['node_modules/angular/angular.js',
                   'node_modules/restangular/src/restangular.js',
                   'node_modules/underscore/underscore.js',
                   'node_modules/d3/d3.js'],
    html: ['src/main/templates/*.html',
           'src/main/templates/**/*.html'],
    dest: ['web-app/js',
           'build'],
    clean: ['web-app/js/*.js',
            'build/*.js']
};

//ToDo: Doesn't seem to like relative paths. Using direct path for now.
gulp.task('test', function(done) {
    new karma({
        configFile: 'C:/workspace/CrossChxCodeTest/test/Javascript/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('build', function(){
    gulp.src(['build/templates.js','src/main/javascripts/*.js'])
        .pipe(concat('railroadRoute.js'))
        .pipe(gulp.dest(paths.dest[1]));
    gulp.src(['node_modules/angular/angular.js',
        'node_modules/underscore/underscore.js',
        'node_modules/restangular/src/restangular.js',
        'node_modules/d3/d3.js'])
        .pipe(concat('dependencies.js'))
        .pipe(gulp.dest(paths.dest[1]))
});

gulp.task('template', function(){
   gulp.src(paths.html)
       .pipe(html2js({
           outputModuleName: 'templates-main',
           useStrict: true
       }))
       .pipe(concat('templates.js'))
       .pipe(gulp.dest('build'))
});

gulp.task('annotate', function(){
    gulp.src('build/railroadRoute.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest(paths.dest[0]));
    gulp.src('build/dependencies.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest(paths.dest[0]))
});

gulp.task('clean', function(){
    gulp.src(paths.clean[0])
        .pipe(clean());
    gulp.src(paths.clean[1])
        .pipe(clean());
});

gulp.task('copy', function(){
    gulp.src('build/dependencies.js')
        .pipe(gulp.dest(paths.dest[0]));
    gulp.src('build/railroadRoute.js')
        .pipe(gulp.dest(paths.dest[0]));
});


gulp.task('default', ['template', 'build', 'annotate', 'copy']);