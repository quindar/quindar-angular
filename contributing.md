# How to Contribute
Updated: Feb 9, 2016

This document depicts how to engage and contribute to the Data Visualization Framework for Mission Operations software, as well as the development guidelines (e.g. coding style, testing checklist).  Please be aware that additional agreements may be necessary before we can accept changes from external contributors.

## Summary
* Contributors can clone the master, make code changes and contribute back by submitting a pull request.
* This document defines development guidelines (e.g. coding style, testing checklist) for contributors.
* Reviewers will perform design/code review, update reviewer checklist, and post questions in the discussion forum.
* When reviewers decide the code changes are ready, they will merge back with master.


## Engagement Process
This project will use GIT technology stack for version control management, including branching, merging, and design/code review.  The repository will be https://www.github.com/audacy/xxx.

Here is a high level workflow for contributing to the project:
* Contributors (author role) to fork the repository.
* If this is a feature, contributors could implement new codes for new requirements.
* If this is a bug fix, contributors will pick an issue to work on, and submit a proposed solution.
  - They will follow the development guidelines (e.g. coding style, checklist) for consistency and quality.
  - They will use Author Checklist to check if anything is missing.
* Contributors will add appropriate tests. If the tests run without errors, they can submit a pull request for code merge.
* Reviewers will perform code review. If the code quality meets requirements, they will commit code merge.
  - They will use Reviewer Checklist to check if anything is missing.
  - Continuous integration process is important to ensure code changes are tested without error before the code merge.

### Roles
Like many open source projects, we have the following roles:
* Author - developers who write the source codes and processing logic. They will also write the unit test and the supporting technical documentation. 
* Reviewer - developers who review the design, and assess if the codes meet the development guidelines and standard. 
* Integrator - developers who will merge the codes with master. They may be also the reviewer themselves.

### Branching
* Official branch (formal release). This is , e.g. master.
* Developer's branches, e.g. local copy for bug fix, experimental widgets.

Contributors are likely to fork the master as branches, and submit a pull request to merge with the master.  We may create branches for customized version or older release on a case by case basis.

### Merging
Once contributors (developers) make code changes, bug fix, or new code contribution, they can raise a pull request for code merge.  They should meet the development guidelines and standard to ensure consistent style and implementation.  

Reviewers will resolve any merge conflicts (e.g. diff), cherry pick the changes (from multiple branches), and run continuous integration process using Jenkins for test automation. If there is no error found from Jenkins, they will commit and push the code changes.


## Development Guidelines
There are separate detailed documentation on coding style, design and code review checklists in the /docs folder. The following guidelines provide high level summary.

### Coding Style and Standard
* Add copyright header (refer to licenses.md) in each source code program. Include author, update date and version.

* JavaScript coding style
  - Indentation: use 3 spaces. Do not use tabs.
  - Methods, variables, fields and function names: use camel case (first letter is lower case, e.g. satelliteThrusterStatusWidget()).
  - Constants: use capital letters (e.g. PI = 3.1436).

* Sub-folder structure: /docs for documentation, /js for JavaScript files, /css for CSS stylesheets, /images for graphics and images assets.

* Guidelines for write widget codes with clarity
  - Documentation or annotation for each function
  - Avoid deep nesting for functions, e.g. keep up to 4 levels if possible.
  - Declare local variables up front (instead of inline).

* Backend 
  - Backend JavaScript codes. When configuring widgets, avoid hard-coding the width/height, size or data source in HTML body or JavaScript;  use parameters, variables and/or REST API instead.
  - Use REST API.  If your widget uses live data feed, we recommend wrapping the live data feed using AngularJS service and OAuth security token for data security, instead of custom JavaScript functions.

* Secure coding
  - Add data output sanitization for text views. If your widget requires data input, add data input validation with  regex (regular expression) if applicable. Consider re-using AngularJS features (SCE $sceProvider and sanitize service $SanitizeProvider) for data input validation (e.g. cross-site scripting protection).

### Code Examples
(To be revised)

```
/** scope: global **/

/**
 * Summary of your function - what it does
 *
 * input parameters:
 * @namespace myNameSpace/workItem
 */
define(
   ['./ClassFoo'],
   function (ClassBar) {
      "use strict";

      /**
       * One-liner summary
       *
       * @constructor
       * @memberof myNameSpace/workItem
       */
      function FunctionBaz() {
      }

      // One-line summary of the function FunctionBaz.
      // Here is an example of private method if used internally. Mark it with @private.
      //
      FunctionBaz.prototype.privateMethod = function () {
      };

      /**
       * One-line summary of the function FunctionBaz
       * @param {number} n a parameter
       * @returns {number} a return value
       */
      FunctionBaz.prototype.publicMethod = function (n) {
          return n * 3;
      }
         
      return FunctionBaz;
   }
);
```

## Code Review Process

Contributors will use Author Checklist before submitting a pull request. There are separate design checklist, code review checklist, secure coding checklist and testing checklist in the /docs folder.

### Author Checklist
* Requirements: Do the code changes address the original issue, or meet the original requirement?
* Unit test: Are the unit tests (for code changes and regression testing) updated and included in the command line build script (e.g. Maven)?
* Integration test: Is the command line build script executed with no error?
* Performance: Is there any noticeable improvement or degradation for the widget code changes?
* Security: Is there any security test included, if applicable?
* Documentation: Basic design notes for the code changes. Use one-line text (max. 72 character) to summarize changes in the commit message. Add or update readme.md or relevant documents if needed.

### Review Checklist
* Common: share the same author checklist above.

Specific:
* User experience: do the code changes introduce any new but inconsistent user interface or interaction style?
* Coding style: are the code changes consistent with our coding style and standard?
* Code coverage: Do the code changes have at least 80% code coverage?
* Potential side-effect: Do the code changes break any existing functionality? or do they create "side-effect" (e.g. performance degradation)?
* Technical documentation: Are the code changes clearly documented with reasonable details, e.g. design notes, troubleshooting tips.

## Acceptance Criteria
The acceptance criteria for the contribution includes:
* Code changes should address original issue, or meet requirements. This will be verified by reviewers.
* Unit tests/integration tests/security tests should support the code changes, and should not break the existing functionality.
* Consistent coding style and standard.
* Reasonable technical documentation and tutorial examples.
* Codes can be built, and test using continuous integration scripts with no error.


## Testing Standard
* 3 types of automated tests required before we can release quality software: (1) unit testing, (2) end-to-end integration testing, and (3) security testing.

### Unit Testing
* Unit testing should include:
  - Verification of each JavaScript function or AngularJS directive is working as defined. 
  - Test coverage for each function should be at least 80% (usually measured by code coverage tools). This means every parameter in each function should be verified with positive and negative test value. For instance, unit test should check if function foo(a,b) will break when parameter a is null.
  - Positive test typically includes testing the expected return value as defined in the processing logic from the function. Negative test usually checks for (1) boundary of the input data type, (2) permutate null/non-null value of the parameters, (3) extreme value, edge or corner case of the input data value, (4) code injection vulnerability using escape characters for input string, etc. 
  - For data visualization widgets, the negative test would be helpful to check for extreme value or out of boundary values for SVG vector graphics plot functions.  Improper implementation may result in memory exhaustion when loading huge objects.
  - Common unit testing tools for JavaScript: Jasmine.

### Integration Testing
* End-to-end integration testing is useful for smoke test or regression test because it will mimick end-user interaction using a Web browser.
  - It helps to ensure code changes will not break existing functionality by using end-to-end integration test. However, if the code base has many variation or branch-out processing logic, integration tests may focus on the 'happy path' or the most critical use case scenarios.
  - Common end-to-end integration testing tools: Selenium (can simulate different Web browser for compatibility test).

### Security Testing
* Security testing is important to mitigate the risk of:
  - Availability issue caused by memory exhaustion (e.g. memory leakage from SVG plot function), or Denial of Service (e.g. Distributed Denial of Service attack to JavaScript functions).
  - Identity theft caused by cross-site scripting or cross-site request forgery attacks (e.g. stealing cookies from widgets data input screen).
  - Information leakage of sensitive images or live data feeds, if the credentials of data sources are being hacked from the HTML Web page source.

## Issue Reporting
* Issues are tracked using GitHub's issues tab. They should include:
  - Basic and short description.
  - Long description that depicts how the issue can be recreated for debugging or troubleshooting. Include screenshots and the steps to re-create the issue, wherever appropriate.
  - Highlight any user impact or side-effect from user perspective.

* Reviewers may assign issue to contributors (authors) to fix issues.

* Priority:  Critical (Blocker), High, Medium, Low, and Unspecified.


