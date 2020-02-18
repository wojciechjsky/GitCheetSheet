/* 
Settings of your local computer:
    git config --global user.name <Name>
    git config --global user.email <Email>
    git config --list

    git log --graph -->shows graphical version of logs
*/

/***    LOW LEVEL COMMANDS      ***/

// git hash-object  -->  with help of this command we will be able to create new object in git structure
/* Example 1:
           input: echo "Hello, Git" | git hash-object --stdin
           output:  b7aec520dec0a7516c18eb4c68b64ae1eb9b5a5e
 
    Hash of the output is created as result of hashing sentence "Hello, Git".
    If I add to '-w' to the end of the command like this: echo "Hello, Git" | git hash-object --stdin -w
    I can see then inside of .git/objects newly created object where new catalog starts with b7 in this case
    which is representation of 2 first chars of the hash and inside of the catalog there will be rest of the hash combination
    as binary file.

    Pipe | in that command means that result of the operation: 
    echo "Hello, Git" will be send as standard input to next command.

  Example 2:
     Case where file is in parent repository.
            input: git hash object ../new-file.txt -w


*/
//--------------------------------------------------------------------------------------------------------

/*      git cat-file     --> with help of this command we will be able to read git objects
            git cat-file -p <hash> --> Contents of the object.
            git cat-file -s <hash> --> Size of the object.
            git cat-file -t <hash> --> Type of the object.

*/

//--------------------------------------------------------------------------------------------------------

/*  

git mktree       --> with help of this command we will be able to create new tree object
  Creating tree object:
    First need to create file which will store some data appended bellow:
    Using nano editor we can type command: nano <filename.txt>  
    the path can be even on desktop
    then we need to put table of information:
    100644 blob 4400aae52a27341314f423095846b1f215a7cf08    somefilename1.txt (between hash and filename.txt MUST be TAB)
    100644 blob b7aec520dec0a7516c18eb4c68b64ae1eb9b5a5e    somefilename2.txt

    Finally we get new hash of the tree conaining 2 blob object from above by typing comman:
    cat ../filename.txt | git mktree.

    Type command find .git/objects/ -type f

    Newly created tree should be in objects folder now, we can check it's value by typing:
    git cat-file -p <first 4 char hash>




    Now put objects to staging area from git repository we need to do:
    Unfourtunatelly we can't determine type of object in console, the only way is check all hashes if they are not tree
    like this:
    git cat-file <at least 4 first chars of hash> -t

    Here is the time to use command git read-tree <at least 4 first chars of hash>. Now all files from this tree should
    be already in staging area.

    git ls-files -s --> we can check all files which are in staging area/index

    Last step is to push files to working directory:

    git checkout-index -a ---> this command move files from staging area/index into working directory
    After this command you should see somefilename1.txt and somefilename2.txt in main folder of your git repository.


*/

/*
  BASIC GIT COMMANDS:
  git status
  git add
  git commit
  git log
  git checkout
  git rm --cached <filename.txt> --> this command will remove file from stage to untrack area.

  BRANCH COMMANDS:
  git branch                    --> List all local branchees
  git branch <name>             --> Create new branch
  git checkout <name>           --> Check specific branch
  git branch -d <name>          --> Delete specific branch (small -d delete only merged branch 
                                                             capital -D will delete even not merged branch)
  git branch -m <old> <new>     --> Rename specific branch
  git checkout -b <branch name> --> Shortcut for creating a branch with checkout

*/

/* There are 2 ways to merge branches

- ************* Fast-Forward merge

  This merge is possible when there are no further 
  commits in the reciving branch after the commit where feature branch was created.
  Simply this way moves pointer from one commit to another commit.

  git merge <feature-branch>

  git merge --abort  --> this command will abort merge proccess

- ************** 3-way merge


git push
git fetch
git pull
git branch -a  --> shows all branches remote and local...
git branch -r  --> shows only remote branches
git branch -vv --> shows all tracking branches

git remote --> shows 'origin'
git remote show origin --> shows urls and addition information

git fetch -v --> shows whether local branches are up-to-date to remote branches
git pull -v --> it is almost same like command above

----- git pull command performs git fetch first and after that 
----- if there are some additional changes in remote branch it will try to merge them to local branch

git merge FETCH_HEAD  --> this command will merge '3-way merge' changes in local and remote repository

git push --set-upstream origin <name of branch> --> This command will push the current branch 
                                                    and set the remote as upstream

git push -v -u origin feature-2 --> is the same command like command above!!!!

git push origin -d <name of branch>  --> in this way I can delete remote branch from terminalin GitHub

!!!!!! git show-ref --> this command shows references for local and remote repository
git show-ref <name of branch> --> shows references like above but only for specific branch

pull request === merge request --> this is the same command but usage can depend on the program which we are use to
                                   serve git and github actions
                               --> this command pull some specific branch commited and pushed by someone
                                   in order to check wheter some changes developed by someone are OK??
                                   

git remote add upstream <url of some repository> --> if I want to some repository (parent) will become one of my remote servers
                                                     pull/fetch repository i.e. when I forked someone repository

git fetch upstream -v --> shows list of the branches from remote upstream repository
git branch -a         --> shows branches from repository
            IF I PUT 2 THOSE COMMANDS IN THIS ORDER I WILL SEE BOTH BRANCHES FROM ORIGIN SERVER AND UPSTEAM SERVER!!!!

git pull upstream <for examp: master(some branch of upstream server)> -v --> This let me pull changes from original server



There are 2 types of tag LIGTHWEIGHT TAGS and ANNOTATED TAGS

git tag --> this command shows all tags in the git folder
git show <tag name> --> this command will show commit of the tag where it was created

ls .git/refs/tags  --> this command will show list of all tags in local repository
cat .git/refs/tags/<tag version> --> by this command we will see content of the tag which is simply hash SHA1

git tag -v <specific version of tag>  --> this commmand doesn't work with ligthweight tags

Git tags are not pushed to remote reopository by default!!
                          ----------------------------------------------------------
IT IS HIGHLY RECOMMENDED TO USE ANNOTATED TAGS !!!!!!!

example of annotated tag:  git tag -a v1.0.0 -m "Initial tag"
Here will work command git tag -v v1.0.0 and will output: details about this specific tag like
                                                          author, date, hash of commit 'connected of this tag
                                                          tag name and some minor info

After writing command --> cat .git/refs/tags/v1.0.0  SHA1 hash(tag hash) will differ from SHA1 hash of commit 
                                                     associated w this tag


If I want to push local repository with tags I need to use command:
git push -v --tags
git push -v origin v1.0.1 --> Example of pushing ONLY tag to remote server without commits!!!!


**************************************************************************************************

                                ------------ REBASING ------------
Do not ever use rebasing on public branches like master or release, it changes history and can really mess up!

Rebasing: 
    - it is alternative to merge 2 branches into 1
    - rewrites history
    - history becomes linear
    - doesn't keep entire history of all commits


Example of rebasing:
1. Checkout feature1 branch -                           --> git checkout feature1
2. Rebase feature1 branch on top of the base branch     --> git rebase master
3. Checkout base branch                                 --> git checkout master
4. Merge feature branch into the base branch            --> git merge feature1
   Fast-forward merge will be used



   -------------------- some extra commands :

   git log --oneline -->shows commits in oneline
   git log --graph   --> grahpical exhibition of commits in console
   git log --graph --oneline --> mixture of those above
   git log --stat    --> quantity of actual changes made in every commit
   git log -p        -->shows CHANGES made in file 
   git log -4 (any number)  --> shows commit of given number
   git log -4 --oneline   -->same like above but in oneline

   git shortlog --> shows quantity of commits made by specific author
   git shortlog -n --> like above but sorted authors 
                       descending by quantity of commits
   git shortlog -n -s --> summary list of authors and numbers of commits
   git shortlog -n -s -e -->same like above but it shows emails of authors as well


   Filtering commits:
   git log --author="someUserName" --> show only commits made by specific author
   git log --grep="someTextOFcommit(i.e. from description)" -->shows commits contains given string in description or title or version
   git log --pretty=format:"%H" --> this will output only full sha1hash of all commits
   git log --pretty=format:"%cn %H" -->this will show like above but with name of commiter
   git log --pretty=format:"%cn %h" --> like above but shorten version of sha1hash of commit
                                    --> I can put to this command some extra text to be better displayed like:
                                        git log --pretty="Author: %cn log: %h"
                                        display will look like: Author: GitHub log: dad3d99f
   %cd shows date int command above!

   git log --merges --oneline -->shows all sha1hash of merges
   git log --no-merges --oneline -->shows all sha1hashes of commits without merges commits

   git reset --> helps you to discard some commits
   there are 3 options of this command: --hard --> reset commit reset staging area and reset working directory
                                        --mixed(default)
                                        --soft --> this reset commit but changes are keept in working directory
   git reset HEAD~5 -->this command will reset last 5 commits (number is optional)


   git revert --> doesn't modify history but add extra commit
                  you are able to revert single commit unlike in reset command
   
   git commit --amend -m "some message" --> actually this command is destruction of last commit
                                            it changes sha1hash

   git commit --amend --author="Someone <example@email.com>" 
                                      --> this change author

   git cherry-pick <hash>  --> Let to take any previous specific commit and place it as a last HEAD commit


   git reflog --> shows are changes which I did on my local repository
   git regflog show <branchname> -->same like above but for specific branch

   Stashing --> it allows you to save uncommited work
                after switching branch and back again to first branch I am able to retrive files
                and work on them ... 
            2 steps:
                    git stash  --> it adds reference to  .git/refs/stash
                    Now you can check branch do sth there and come back to 'stashed' branch
                    git stash pop --> this will retrive previous changes from stash to repository


    git gc  ---> this command makes garbage collection

 */