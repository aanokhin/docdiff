
# Configuration for MS Word Diff scripts with Git

We should see something like this in ~/.git attributes

```properties
*.docx diff=msword
*.doc  diff=msword
```

We should see something like this in ~/.gitconfig :

```properties
[diff "msword"]
    guitool = msword

[difftool]
    prompt = false

[difftool "msword"]
    cmd = C:/An/Scripts/run-word-diff.bat "$LOCAL" "$REMOTE"
    trustExitCode = false

[difftool "sourcetree"]
	cmd = 'C:/An/Scripts/run-word-diff.bat' $LOCAL $REMOTE
[mergetool "sourcetree"]
	cmd = 'C:/An/Scripts/run-word-diff.bat' $LOCAL $REMOTE
	trustExitCode = false
	keepBackup = false
```

Then

`git difftool --tool=msword <path to document>.docx`

will start MSWord in diff/revision mode with both Original and Revision on the right side, list of changes on the left and target in the middle

> ⚠️If there is no changes to the file it will not do anything. No warning. No info

Sourcetree is optional, but it nicely manipulates attributes.
[mergetool "sourcetree"]: I am not sure, but Word diff by itself looks like merge, though there is no $base or $target there. I am not sure I will use it for MS Word docs
