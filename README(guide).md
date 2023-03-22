## 1. Node.js 설치

gulp를 사용하기 위해서 node.js 를 다운로드 받기

- https://nodejs.org `<-   v14.4.0 버전 설치`

node와 npm이 제대로 설치되었는지 확인

```
* [ 노드 버전 확인 ]   node -v
* [ npm 버전 확인 ]   npm -v
```

## 1-1. node-sass, gulp-sass 변경

기존 gulp-sass, node-sass 제거
npm uninstall gulp-sass -D
npm uninstall node-sass -D

적용 버전 설치
npm install node-sass@5.1.0
npm install gulp-sass@8.0.0

참고 node-sass, gulp-sass ver
"gulp-sass": "^5.1.0",
"node-sass": "^8.0.0",

## 2. gulp 설치

```
npm install --global gulp-cli
```

gulp를 사용하기 위해서는 npm을 통해 gulp-cli를 전역으로 설치

```
* [gulp 전역설치 버전확인]  gulp -v
```

## 3. npm 의존 설치

```
npm install
```

## 4.package 실행

```
npm run dev
```

## Project 구조

```
+-- project
| +-- build
| +-- node_modules
| +-- dev
| | +-- _include
| | +-- _scss
| | +-- font
| | +-- html
| | | +-- list.html
| | +-- images
| | +-- js


## gulp-sass 에러해결
https://seoftware.tistory.com/m/138
```
