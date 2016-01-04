new-component-scaffold
===
A scaffold for developing a new component with ES6.

Todo
---
- [x] Add gulp with ES6
- [x] Allow develop with ES6+Browserify
- [x] Serve file with BrowserSync
- [x] Add testing support with Karma
  - [x] With jasmine
  - [ ] With mocha and chai
- [ ] Better way to select file to complile
- [ ] Add support for SASS
- [ ] Better documentation

Usage
---
Installation
- git clone https://github.com/ngleich/new-component-scaffold && cd $_
- npm install

Development

All the js files should be in src/js folder
- Change jsFileToCompile in gulpfile.babel.js to select file to compile
- That file can import every file and generate the final usage of the component
- gulp serve will start a server and use browssync to sync files
- In demo you can use an index.html file and call js/yourfile.js
- All .js files can be written in ES6 with modules

Test
- The files to test should be under test/ folder
- The files to test should end with _spec.js
- All the files end with _helper.js will be load before the _spec.js files
- For adding libraries (like angular or jquery) you should modify karma.config.js
- All spec, helper and config can be written in ES6