/* Git object types

1. BLOB
2. TREE
3. COMMIT
4. ANNOTATED TAG


Ad1: In BLOB Object types GIT stores files with any extensions either video files pictures text files.
Ad2: With help of Tree files GIT stores informations about directories and folders
Ad3: With help of COMMIT we are able to store within GIT different versions of project.
Ad3: ANNOTATED TAG is persistance pointer of specific commit.

GIT use SHA1 algorithm which is 160 bits and contains with 40 hexadecimal characters.

GIT can store 2^160 different files in the same repository.

GIT blobs doesn't have filenames, and doesn't store original filename in the file.

GIT size and type of each object are stored in GIT blob file

Filenames are stored inside of the TREE objects


******* GIT TREE OBJECTS ***********

4 fields of Tree Object in GIT
- PERSMISIONS: 
    040000 - Directory
    100644 - Regular non-executable file
    100644 - Regular non-executable group-writeable file
    100755 - Regular executable file
    120000 - Symbolic link
    160000 - Gitlink
- TYPES: blob/tree
- SHA1HASH: for example: 4a41792c7aeff3d0ffb622c5dcf6276186890aa6
- FILE OR DIRECTORY

----------------------------------------

Commit contains pointer to the specific tree, commit is simply a wraper around tree object in git database.

ANNOTATED TAG       --> static text pointer to specific commit
                        for example branch pointer is moving with creation of new commit and its called dynamic

CI/CD ---> Continuous integration /Continuous development




*/
