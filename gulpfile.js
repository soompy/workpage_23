const gulp = require("gulp");

const fileinclude = require("gulp-file-include");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const autoprefixer = require("gulp-autoprefixer");
// const scss = require("gulp-sass");

const scss = require("gulp-sass")(require("sass"));
const cssbeautify = require("gulp-cssbeautify");

const buffer = require("vinyl-buffer");
const csso = require("gulp-csso"); //css minify
const merge = require("merge-stream");
// const spritesmith = require('gulp.spritesmith');
const sourcemaps = require("gulp-sourcemaps");

// const del = require('del');

// 소스 루트 경로
const dev = "./dev";
const build = "./build";

// 소스 세부 경로
const devPath = {
    // html: [ dev + '/html/**/*.html', '!' + dev + '/_*/*.html'],
    // html: [ dev + '/html/**/*.html', '!' + dev + 'html/_*/'],
    // html: dev + '/html/**/*.html', '!./dev/html/_*/*.html',
    html: [dev + "/html/**/*.html"],
    scss: dev + "/_scss/**/*.scss",
    js: [dev + "/js/*.js"],
    images: dev + "/images/**/*.{gif,png,jpeg,jpg,svg}",
    fonts: dev + "/fonts/**/*",
    // sprite: dev + '/images/sprite/*.{gif,png,jpeg,jpg,svg}',
  },
  buildPath = {
    html: build + "/html",
    css: build + "/css",
    js: build + "/js",
    images: build + "/images/",
    fonts: build + "/fonts/",
    // sprite: build + '/images/sprite/'
  };

// gulp.task('clean', () => {
//     return new Promise( resolve => {
//         del.sync(build);

//         resolve();
//     });
// });

// build 폴더를 기준으로 웹서버 실행
gulp.task("server", function (done) {
  browserSync.init({
    server: {
      baseDir: "./build/", // 웹서버 root폴더 경로 지정
      directory: true,
    },
    browser: ["chrome" /*"firefox"*/], // 원하는 브라우저로 실행한다
  });
  done();
});

/*
gulp.task('sprite', function () {
    // Generate our spritesheet
    var spriteData = gulp.src(devPath.sprite).pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        cssOpts: {
            cssSelector: function(sprite) {
              return '.sprite_' + sprite.name;
            }
          }
    }));

    // Pipe image stream through image optimizer and onto disk
    var imgStream = spriteData.img
      // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest(buildPath.sprite));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
        // .pipe(csso()) // css 압축
        .pipe(gulp.dest(buildPath.sprite));
  
    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
});
*/

// HTML 파일을 minify
gulp.task("htmlComplie", function (done) {
  // gulp.src(devPath.html, {since:gulp.lastRun('htmlComplie')}) //src 폴더 아래의 모든 html 파일을
  gulp
    .src(devPath.html) //src 폴더 아래의 모든 html 파일을
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest(buildPath.html)) //위에 설정된 build 폴더에 저장
    .pipe(browserSync.reload({ stream: true })); //browserSync 로 브라우저에 반영
  //reload 메서드의 옵션으로 stream:true를 주었기 때문에 변경된 파일만 stream 으로 브라우저에 전송되어 리프레시 없이도 반영이 가능한 경우 리프레시 없이 반영
  done();
});

// CSS 파일을 minify
gulp.task("scssCompile", function (done) {
  // gulp.src(devPath.scss, {since:gulp.lastRun('scssCompile')}) //_scss 폴더의 *.scss 파일을  : 수정된 파일만

  gulp
    .src(devPath.scss) //_scss 폴더의 *.scss 파일을

    // .pipe(sourcemaps.init())

    .pipe(
      scss({
        sourceComments: true, // 컴파일 된 CSS에 원본소스의 위치와 줄수 주석표시
      }).on("error", scss.logError)
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: [
          "> 5%", // browsers versions selected by global usage statistics. >=, < and <= work too.
          "Firefox > 1", // versions of Firefox newer than 20. >=, < and <= work too. It also works with Node.js.
          "last 2 versions", // he last 2 versions for each browser.
        ],
      })
    )
    .pipe(
      cssbeautify({
        indent: "\t",
        autosemicolon: true,
      })
    )

    // .pipe(sourcemaps.write(''))

    // .pipe(csso()) // css minify
    .pipe(gulp.dest(buildPath.css)) //위에 설정된 build 폴더에 저장
    .pipe(browserSync.reload({ stream: true })); //browserSync 로 브라우저에 반영
  done();
});

// JavaScript minify
gulp.task("jsCompile", function (done) {
  gulp
    .src(devPath.js, { since: gulp.lastRun("jsCompile") })
    .pipe(gulp.dest(buildPath.js)) //위에 설정된 build 폴더에 저장
    .pipe(browserSync.reload({ stream: true }));
  done();
});

// 이미지 압축
gulp.task("imgMinCompile", function (done) {
  gulp
    .src(devPath.images)
    .pipe(
      imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true,
        verbose: true,
      })
    ) //이미지 최적화
    .pipe(gulp.dest(buildPath.images)); //동시에 build에도 출력
  done();
});

// 폰트
gulp.task("fontCompile", function (done) {
  gulp.src(devPath.fonts).pipe(gulp.dest(buildPath.fonts));
  done();
});

// 파일 변경 감지
gulp.task("watch", function (done) {
  //src 디렉토리 안에 html 확장자를 가진 파일이 변경되면 htmlComplie task 실행
  gulp.watch(devPath.html, gulp.series("htmlComplie"));
  //src 디렉토리 안에 css 확장자를 가진 파일이 변경되면 scssCompile task 실행
  gulp.watch(devPath.scss, gulp.series("scssCompile"));
  //src 디렉토리 안에 js 확장자를 가진 파일이 변경되면 jsCompile task 실행
  gulp.watch(devPath.js, gulp.series("jsCompile"));
  //src 디렉토리 안에 js 확장자를 가진 파일이 변경되면 imgMinCompile task 실행
  gulp.watch(devPath.images, gulp.series("imgMinCompile"));
  //src 디렉토리 안에 images/icons  내용이변경되면
  // gulp.watch(devPath.images, gulp.series('sprite'));
  done();
});

// gulp를 실행하면 default 로 server task와 watch task, imgMinCompile task를 실행
// series = 순차
// parallel = 동시 or 병렬(실행은 동시에 시작되지만 처리속도에 따라 종료시점이 달라진다)
gulp.task("default", gulp.series("jsCompile", "scssCompile", "htmlComplie", "imgMinCompile", "fontCompile", gulp.parallel("watch", "server")));
