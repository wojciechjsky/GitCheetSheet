/**
pwd
touch

echo "Some text"     --> this command let us display "Some text" in console with linebreaker
echo -n "Some text"  --> this command doesn't move us to next line

echo "Some text" | shasum
echo -n "Some text" | shasum

----> VERY IMPORTANT DIFFERENCE BETWEEN THOSE TWO COMANDS IS LINE BREAKER!!! 
- first command generate:  5a08924b0ef1cccfb5de1d94e3d75c38dc0d3c79 
- second command generate: 02d92c580d4ede6c80a878bdd9f3142d8f757be8 

Text is the same but slight difference is '\n' char which makes those hashes different!

find .git/objects -type f --> this command shows us the list of all files in the directory


git read-tree <hash> --> this command putting all tree object from git repository into staging area

 */