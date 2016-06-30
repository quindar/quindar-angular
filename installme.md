#npm + napa + grunt:

In order to automatically stay up to date with third party dependencies and Audacy github projects while developing, we use npm backend packaging with support from napa and grunt. Napa allows for github pulls (as well as other sources) for our and others’ code, and grunt automates the process, as well as other processes (explained below). More information for each can be found here:

[npm](https://www.npmjs.com/) npm is a backend package management service.

[napa](https://github.com/shama/napa) napa dictates pulls from github (and other sources) to keep development code up to date.

[grunt](http://gruntjs.com/) grunt automates tasks such as app dependency updating and script minification.

##How to Install
napa and grunt are already included in our package.json file as a dependencies and to install, simply run the buildme:

$ ./buildme.sh

##napa example:
In package.json:
```javascript
scripts:{
	“install”: “napa”
	},

“napa”:{
	“groundtrack”: 'https://github.com/audacydevops/quindar-groundtrack'
	},
```
This crawls to our github repository “quindar-groundtrack” and downloads the most recent copy of the ground track widget code to keep the developer current. It will run with the npm install command or by running the buildme.sh file.

##grunt example:
Gruntfile.js keeps the dependencies up to date with devUpdate. devUpdate reads the dependency and devDependency lists in package.json and automatically checks their repositories for the most current version and updates local dependencies if necessary. Like so:
```javascript
module.exports = function(grunt) {
grunt.initConfig({
devUpdate: {
        main: {
            options: {
                updateType: 'force', //force updates of outdated packages
                reportUpdated: true, //report up-to-date packages
                semver: true, //stay within semver when updating
                packages: {
                    devDependencies: true, //check both dev dependencies and standard dependencies
                    dependencies: true
                },
                packageJson: null, //use matchdep default findup to locate package.json
                reportOnlyPkgs: [] //use updateType action on all packages
            }
         } 
      }
  });
};
```
To call the devUpdate task you would register a a grunt task below the code and load in its dependent information like so:
```javascript
grunt.loadNpmTasks('grunt-contrib-devUpdate'); //the contrib in the title means it came from the contibutor community.
grunt.registerTask('xxx', ['devUpdate']);
```
if you run "$ gunt xxx" in the terminal the devUpdate task will execute on all your dependencies. If you name your registered task 'default' then it will run with only the prompt "$ grunt."

Read the rest of the Gruntfile.js for more examples.

Napa and grunt used with npm automates several tasks to make development easier.

#####Updated 06/30/2016 by Michael McKenna


