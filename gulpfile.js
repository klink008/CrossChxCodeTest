var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var html2js = require('gulp-html2js');
var runSequence = require('run-sequence');
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

gulp.task('src-build', function(){
    return gulp.src(['build/templates.js','src/main/javascripts/*.js'])
        .pipe(concat('railroadRoute.js'))
        .pipe(gulp.dest(paths.dest[1]));
});

gulp.task('dep-build', function(){
    return gulp.src(['node_modules/angular/angular.js',
        'node_modules/underscore/underscore.js',
        'node_modules/restangular/src/restangular.js',
        'node_modules/d3/d3.js'])
        .pipe(concat('dependencies.js'))
        .pipe(gulp.dest(paths.dest[1]))
});

gulp.task('template', function(){
   return gulp.src(paths.html)
       .pipe(html2js({
           outputModuleName: 'templates-main',
           useStrict: true
       }))
       .pipe(concat('templates.js'))
       .pipe(gulp.dest('build'))
});

gulp.task('dep-annotate', function(){
    return gulp.src('build/dependencies.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest(paths.dest[0]))
});

gulp.task('src-annotate', function(){
    return gulp.src('build/railroadRoute.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest(paths.dest[0]));
});

gulp.task('build-clean', function(){
    return gulp.src(paths.clean[0])
        .pipe(clean());
});

gulp.task('web-app-clean', function(){
    return gulp.src(paths.clean[1])
        .pipe(clean());
});

gulp.task('dep-copy', function(){
    return gulp.src('build/dependencies.js')
        .pipe(gulp.dest('web-app/js'));
});

gulp.task('src-copy', function(){
    return gulp.src('build/railroadRoute.js')
        .pipe(gulp.dest('web-app/js'));
});


gulp.task('default', function(callback){
    runSequence(['web-app-clean','build-clean'],
                'template',
                ['src-build','dep-build'],
                ['src-annotate','dep-annotate'],
                ['src-copy','dep-copy'],
                callback)
});