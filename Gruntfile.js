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
      },
      copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/groundtrack/dist/',
                    src: ['angular-groundtrack.js'],
                    dest: 'app/directives/'
                }]
            }
        }, 
	 concat: {
	    js: {
	        src: ['app/**/*.js', 'app/*.js', 'app/scripts/plugins/visualization/d3/*.js'],
	        dest: 'app/concat.js'
	    },
	    css: {
			src: ['app/styles/*.css', 'app/styles/icons/**/*.css'],
			dest: 'app/concat.css'
	      }
	  },
	  watch: {
	    js: {
			files: ['app/**/*.js', 'app/app.js', 'app/scripts/plugins/visualization/d3/8.js'],
			tasks: ['concat']
	         },
	    css: {
		files: ['app/styles/*.css', 'app/styles/icons/**/*.css'],
		tasks: ['concat']
	         },
	   },
	  uglify: {
	    my_target: {
		files: {
			'app/scripts.min.js': ['app/concat.js'],
			}
		}
	   },
	  cssmin: {
  		options: {
    	shorthandCompacting: false,
    	roundingPrecision: -1
  			},
  		target: {
    		files: {
      		'app/styles.min.css': ['app/concat.css']
    		}
  		}
	  },
      processhtml: {
        build: {
            files: {
                'index.html' : ['index.html']
            }
        }
	  },
  	  clean: {
  	  	js: ['app/directives/angular-groundtrack.js']
  	  }	
	 	 
    });
	
	

	  grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-contrib-concat');
 	  grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-cssmin');
  	grunt.loadNpmTasks('grunt-processhtml');
  	grunt.loadNpmTasks('grunt-dev-update');
  	grunt.loadNpmTasks('grunt-contrib-clean');

  	grunt.registerTask('est', ['devUpdate', 'clean', 'copy']);
  	grunt.registerTask('default',['concat', 'cssmin', 'uglify', 'processhtml', 'watch']);
};

