# Quick Guide to Git Commands
Updated: Jul 15, 2016 by Ray Lai

## First-time users
### I want to make a local copy of the GIT repo
* Copy the Git repo URL from the Github project | Clone or Download
* From a terminal window (or Windows command window), issue the command "git clone <Git Repo>", e.g.

```
%git clone https://github.com/audacyDevOps/quindar-angular.git
```

### I have a local copy of the GIT repo, and have made some code changes. Since I'm a collaborator (with push admin rights), I want to push the code changes.
* For simple scenario (e.g. 1 user, 1 code change), you can issue the following command sequence from your home folder:

```
%git add *
%git commit -m "summary of changes - xxx"
%git push -u origin master
```

Caution
If you have committed multiple times (e.g. you change program1.js, commit, then change program2.js and then commit), GIT will process your last commit. In such a case, you may risk losing the first few changes. Thus, when you commit, always push out first before you make another commit.

## What if...
* I am in the midst of code changes, and commit some code changes but have not pushed changes yet. Then I notice I need to back out some code changes (e.g. I have committed changes to add /node_modules incorrectly; I'm supposed to exclude this subfolder). how do I "undo" the commit?

```
%git stash
```
or
```
%git stash clear
```

Alternatively, you drop and delete the current project folder, and re-clone again.

* I have an existing folder for the GitHub project. I have not made any changes for a while. I notice there are new code changes pushed. How do I refresh the project folder?

```
%git pull
```

* Earlier I did a git clone of the master, and start to make some changes. Team members add some code changes in parallel, so my existing clone is already out of sync. How do I catch up with the master without impacting or giving up my current changes?

```
%git pull --rebase
```


## Code merge
Assuming we have 1 Github administrator (or collaborator), and other developers are community contributors and they don't have admin rights to push the code changes.  
* Create a branch: The community developer will create a branch (if you have appropriate access rights, you can create a branch from the Github project home page | Branch: Master), or you clone a branch (refer to the example below).

Example:

Create a branch from Github project home page called 'branch1-michael'
```
%git clone https://github.com/audacyDevOps/quindar-angular.git
%cd quindar-angular/
%git checkout branch1-michael

Branch branch1-michael set up to track remote branch branch1-michael from origin.
Switched to a new branch 'branch1-michael'
```
* New pull request: Once codes are ready for merge (after you push code changes to the branch), developers can raise a pull request from the Github project home page | New pull request

  * complete code changes to your branch (e.g. branch1-michael).  Make sure when you push changes, you push to the branch, not master, e.g. **"git push -u origin branch1-michael"**
  * From GitHub project home page, click "New Pull Request". Select the target branch for merge (e.g. branch1-michael), and click "New Pull Request". This will bring up a pull request form where you can enter the pull request rationale or details.
  * Administrator or collaborator will review the pull request and code changes.
  * Once administrator or collaborator completes the code review, they can approve by clicking the "Merge pull request" button. We recommend using the command instructions instead of clicking the merge button (remark: code merge issues and multiple commits can make it complex to manage).
  * GitHub will prompt you for the merge instructions, e.g.

Only administrators or collaborators can execute these commands:

Step 1: From your project repository, bring in the changes and test.

```
git fetch origin
git checkout -b branch1-michael origin/branch1-michael
git merge master
```

Step 2: Merge the changes and update on GitHub.

```
git checkout master
git merge --no-ff branch1-michael
git push origin master
```

* GitHub will notify administrators or collaborators about the merge status by email.
