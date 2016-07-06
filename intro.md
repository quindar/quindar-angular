#An example with a Quindar Angular:

Quindar Angualr is on github at: github.com/audacyDevOps/quindar-angualr.

If you clone the code, build the app, and run it on a local server, it will work well, but there is plenty of room to grow for developers. This is where grunt and napa come into play.

It should be noted that this example uses the quindar-angular application wherein the index.html calls each file individually. This is
the old format for creating quindar apps. The new format for creating quindar app will involve fewer calls to begin with as our files on
our github will be aggregated together.

###Install Quindar Angular
Create a new temporary folder on your desktop or wherever you prefer and clone the quindar-angular github into it.

If you open the index.html in an editor, you’ll notice about 25 lines that call external scripts either stored locally or via cdn. We will be using grunt and napa to concatenate and minify these files, as well as monitor them to update changes that you make.
First, store all the cdn called files locally for concatenation:

In package.json add the following to the scripts section:
```javascript
“scripts”: {
	…
	…
	“install”: “napa”
},
```
Then add a napa section:
```javascript
“napa”: {
	// cdn file calls go here
	“nameYouChoose”: “https://example.com/path/to/file/file.min.css”,
	...
	...
}
```
List all the cdn calls form the index.html as we will want to store them all locally.

napa stores all the entered files locally, which helps with concatenation, but puts them into the node_modules folder, which makes it difficult to work with.

Luckily grunt will help us replace these files to a more helpful location. But first we have to make sure all the dependencies we need for grunt get installed. Copy the followng into the “devDependencies” section:
```javascript
“devDependencies”:{
    "grunt": "1.0.1",
    "grunt-contrib-concat": "1.0.1",
    "grunt-contrib-copy": "1.0.0",
    "grunt-contrib-cssmin": "1.0.1",
    "grunt-contrib-uglify": "1.0.1",
    "grunt-contrib-watch": "1.0.0",
    "grunt-processhtml": "0.4.0",
    "load-grunt-tasks": "3.5.0",
    "napa": "2.3.0",
    "mocha": "^2.5.3",
    "should": "^9.0.2",
    "supertest": "^1.2.0",
    "chai": "^3.2.0",
    "chai-http": "^1.0.0"
}
```
When you run npm install it will install all the grunt devDependencies we need to run our grunt tasks.

(Note: if you have trouble installing grunt, you will have to sudo install it and its command line interface:
```
$ sudo npm install grunt --save-dev      //then enter your computer password
$ sudo npm install grunt-cli --save-dev  //then enter your computer password
```
)

Since the buildme.sh calls npm install, you can simply run buildme.sh instead of npm install. Eiter works:
```
$ ./buildme.sh
```

###Grunt
Now you can use grunt. Create a new file in the root directory of quindar-angular (you should still be in this directory) and call it (Capital G!) Gruntfile.js.

In your editor add the following code:
```javascript
module.exports = function(grunt) {   //all Gruntfiles have this heading, otherwise they don’t run
	grunt.initConfig({ 	     //the information to configure grunt tasks, this runs at the beginning of 
     				     //each task. Below are the settings for each task

	 //concat concatenates all local js and css files together respectively
	 concat: {
        //first javascript
        js: { 
        //src list .js files to concatenate. Example: 'app/scripts/angular-gridster.min.js.
        //since we moved the cdn files to the 'app' folder (see 'copy' taks below), each of their
        //paths is 'app/examplefile.ext'. Please note that oder matters. the list should be sorted by call
        //order in index.html
            src: ['app/angular.min.js', 'app/angular-ui-router.min.js', 'app/pace.min.js', 
                 'app/jquery.min.js', 'app/bootstrap.min.js','app/jquery.blockUI.min.js', 
                 'app/ui-bootstrap-tpls.min.js','app/scripts/angular-gridster.min.js','app/jsapi', 'app/controllers/indexControllers.js', 'app/directives/indexDirectives.js', 'app/directives/angular-groundtrack.js','app/factories/factory-groundtrack.js',  
                    'app/scripts/plugins/visualization/d3/topojson.js', 'app/socket.io.min.js',
                    'app/jquery.flot.min.js', 'app/scripts/js/jquery.flot.resize.js', 
                    'app/scripts/js/jquery.flot.axislabels.js','app/scripts/js/jquery.flot.navigate.js', 
                    'app/scripts/js/jquery.flot.selection.js', 'app/scripts/js/jquery.flot.time.js',
                    'app/directives/angular-lineplot.js', 'app/controllers/app-lineplot.js'], 
        //dest writes a new file with concatenated javascript files according to the path
       dest: 'app/concat.js' 
        },
       //now css
        css: { 
        src: ['app/bootstrap.min.css', 'app/stles/styles.css', 'app/styles/core.css', 'app/styles/components.css', 
                'app/styles/colors.css','app/stlyes/angular-gridster.min.css','app/styles/gridsterDashboard.css', 
                'app/styles/index08a.css', 'app/styles/icons/**/*', 'app/styles/fonts/*'], 
        dest: 'app/concat.css' 
          }
      },
	//watch monitors all local listed files for changes, then runs concat with the changed files
	  watch: { 
	    js: {
			//which files to watch
			files: ['app/**/*.js', 'app/*.js', 'app/scripts/plugins/visualization/d3/8.js'], 
			tasks: ['concat'] 
	         },
	    css: {
		//files to watch
		files: ['app/*.css', 'app/styles/*.css', 'app/styles/icons/**/*.css'],
		//if any files changed, re-run concat task with changes
		tasks: ['concat']
	         },
	   },

	  //uglify minifies concat.js for faster loading
	  uglify: { 
             my_target: {
		  files: {
			//minified file 'quindar-scripts.min.js’ from ‘concat.js'
			'app/quindar-scripts.min.js': ['app/concat.js'],
			}                          
		  }
	   },
	  //css min minifies concat.css for faster loading
	  cssmin: { 
  		options: {
    		shorthandCompacting: false,
    		roundingPrecision: -1
  			},
  		  target: {
    			files: {
				//minified file 'quindar-styles.min.js' from ‘concat.css’
      				'app/quindar-styles.min.css': ['app/concat.css']
    			     }                                             
  		  	}
		 },
         processhtml: {

             build: {
             files: {                          //reads 'index.html' and rewrites script calls from
                'index.html' : ['index.html']  //multiple files to call from the one minified file.
             	  }                             //index.html can be renamed as a new file, but we keep 
	        }                               //the destination as the same name, 'index.html'
        },

	// copy moves the cdn files from node_modules to the more helpful root directory
	// you can add the command “grunt copy” under “npm install” in buildme.sh if you want to
	// have the files copy automatically after install
       copy: {
          main: {
    // each chunk below defines the path to the file (cwd) and the files to copy over (src)
    // as well as their destination (dest). In our case dest is always “app/” as our root
    // directory
            files: [{
                expand: true,
                cwd: 'node_modules/bootstrapcdn',
                src: '*.css',
                dest: 'app/',
            },
            {
                expand: true,
                cwd: 'node_modules/angular-min',
                src: '*.js',
                dest: 'app/',
            },
            {
                expand: true,
                cwd: 'node_modules/router-min',
                src: '*.js',
                dest: 'app/',
            },
            {
                expand: true,
                cwd: 'node_modules/pace-min',
                src: '*.js',
                dest: 'app/',
            },
            {
                expand: true,
                cwd: 'node_modules/jquery-min',
                src: '*.js',
                dest: 'app/',
            },
            {
                expand: true,
                cwd: 'node_modules/bootstrap-min',
                src: '*.js',
                dest: 'app/',
            },
            {
                expand: true,
                cwd: 'node_modules/blockUI-min',
                src: '*.js',
                dest: 'app/',
            },
            {
                expand: true,
                cwd: 'node_modules/tpls-min',
                src: '*.js',
                dest: 'app/',
            },
            {
                expand: true,
                cwd: 'node_modules/socket',
                src: '*.js',
                dest: 'app/',
            },
            {
                expand: true,
                cwd: 'node_modules/flot',
                src: '*.js',
                dest: 'app/',
            },
            {
                expand: true,
                cwd: 'node_modules/googlejsapi/',
                src: ['jsapi'],
                dest: 'app/',
            }]
          }
        }
    });
	
	
	//these lines add loads in information about the tasks called when running grunt. We did not
	// write the tasks ourselves so we have to load them from a third party
  	grunt.loadNpmTasks('grunt-contrib-concat'); 
 	grunt.loadNpmTasks('grunt-contrib-watch');  
  	grunt.loadNpmTasks('grunt-contrib-uglify'); 
  	grunt.loadNpmTasks('grunt-contrib-cssmin');
   	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-processhtml');

	//Each function is called a task, so we have to call the tasks we want. Pass in a name
	// you want, and the tasks listed above you want to run when you call this task.
	// If you use ‘default’ as your name, the tasks will run by only calling “grunt” in cmd or 
	// terminal 

	// uncomment the following line to automate the process, but we recommend working
	// through it manually on the first attempt so you get a feel for the logic.
  	//grunt.registerTask('default',['copy','concat', 'cssmin', 'uglify', 'processhtml', 'watch']);

	// note that each task is called in order, for example you should list concat before cssmin
	// otherwise there will be no concat.css file to minify
};
```
Almost done! We just need to edit “index.html” so it is configured for the processhtml task.

###Editing index.html
In your editor open index.html and you will notice the excessive script calls to cdns and local files. Grunt will concatenate those files, so if you already copied the addresses into package.json under napa, you will no longer need those lines. Rather than deleting them, however, grunt knows how to replace them.

By adding special comments to index.html in select places, you can instruct grunt to replace those calls with one line that calls a minified file instead. 

Before each cluster of external calls, add the following comment:
```html
<!-- build:x ‘filename.ext’ -->
```
Where x is either js or css depending on what chunk of calls you’re shortening, and the filename is the minified file you plan to call.

Likewise after the chunk of calls, add:
```html
<!-- /build -->
```
To signify that this chunk is contained between the “build” and “/build” comments.

When grunt reads these comments and replaces the lines in between to call only the file specified in the “build” comment. This dramatically saves loading time, since we are calling 2-3 scripts rather than 25, including cdn calls which now are stored locally:

```html
 <!-- build:css 'app/quindar-styles.min.css -->
  <link type="text/css" rel="stylesheet" href="app/styles/styles.css">
  <link type="text/css" rel="stylesheet" href="app/styles/core.css">
  <link type="text/css" rel="stylesheet" href="app/styles/components.css">
  <link type="text/css" rel="stylesheet" href="app/styles/colors.css">
  <link rel="stylesheet" href="app/styles/angular-gridster.min.css" />
  <link rel="stylesheet" href="app/styles/gridsterDashboard.css" />
  <!--/build-->
```
Becomes:
```htlml
<script src="app/quindar-styles.css"></script>
```
(Note: since there are two chunks of .js file calls, we have to have two separate sets of "build tags" otherwise processhtml will remove all the code in between those chunks. It also should be noted the second chunk of .js file calls has a .css file call in the middle, so one sets of "build-/build" should be placed on either side of the .css file call which can be left alone. Furthermore, the call to Roboto should not be concatenated and should be left alone.)

Everything is ready to go. Make sure you have built app by running ./buildme.sh, then try your first grunt call:
```
$ grunt copy
```
Look in the app folder and all the cdn files you listed should be present. Now walk through the process one call at a time and you should be able to see the working dashboard at your local port 3000:
```
$ grunt concat
$ grunt uglify
$ grunt cssmin
$ grunt processhtml
$ node server.js
```
Hop on a browser and go to http://localhost:3000. Congrats you streamlined your app and automated several processes for yourself to make development easier.

If you plan to edit the .js or .css files, simply run 

$ grunt watch

Which will monitor changes that occur, and rerun concat. To see the changes immediately, recall uglify and cssmin the rerun the server to load the nw files. You can also add those to the list of tasks run when watch detects a change. Likewise running nodemon instead of simply node (you have to install nodemon as a dependency) you can refresh the page to see any saved changes.

So if you want to edit files and monitor effects instantaneously, add uglify and minify to your list of tasks called under watch, and use nodemon instead of node to run your local server.

Napa and grunt used with npm automates several tasks to make development easier, and your web app faster.

######Updated 7/5/2016 by Michael McKenna
