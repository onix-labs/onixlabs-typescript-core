const gulp = require("gulp");
const typescript = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const clean = require("gulp-clean");
const merge = require("merge-stream");

gulp.task("build", () => {
    const project = typescript
        .createProject("tsconfig.json");

    const result = project
        .src()
        .pipe(sourcemaps.init())
        .pipe(project());

    return merge(result, result.js)
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./dist"));
});

gulp.task("clean", () => {
    return gulp
        .src(["./dist", "./test"], { read: false, allowEmpty: true })
        .pipe(clean());
});