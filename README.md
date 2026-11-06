# Configuration for MS Word Diff scripts with Git

Checkout/copy repo to local folder.

The usage of diff script requires both files referenced in parameters 

`C:/path-to-Scripts/run-word-diff.bat "path1" "path2"`

It wuill open MS Word in diff/revision mode with both Original and Revision on the right side, list of changes on the left and target in the middle

### For ussage with Git 
We should see something like this in ~/.git attributes
```
*.docx diff=msword
*.doc  diff=msword
```

We should see something like this in ~/.gitconfig :
```
[diff "msword"]
    guitool = msword

[difftool]
    prompt = false

[difftool "msword"]
    cmd = C:/path-to-Scripts/run-word-diff.bat "$LOCAL" "$REMOTE"
    trustExitCode = false

[difftool "sourcetree"]
	cmd = 'C:/path-to-Scripts/run-word-diff.bat' $LOCAL $REMOTE
[mergetool "sourcetree"]
	cmd = 'C:/path-to-Scripts/run-word-diff.bat' $LOCAL $REMOTE
	trustExitCode = false
	keepBackup = false
```

Then

`git difftool --tool=msword <path to document>.docx`

will start MSWord if there is difference

⚠️If there is no changes to the file it will not do anything. No warning. No info

**Sourcetree** is optional, but it nicely manipulates attributes.

`[mergetool "sourcetree"]`: I am not sure, but Word diff by itself looks like merge, though there is no $base or $target there. I am not sure I will use it for MS Word docs

### In IntelliJ Idea 

You can create external dif tool. You need to go to ``Settyings > Tools > Diff & Merge > External Diff Tools`` and

1. Enable checkbox `Enable External tools`
1. In `Configure external tools` add Diff tool using Plus sign. Name it as you wish. In `Program path` put `C:/path-to-Scripts/run-word-diff.bat`. In `Arguments` put `%1 %2`

Usage: 
By default, when you double-click a .docx file or view its history, IntelliJ opens its native, empty text viewer window showing the file names. But because we checked "Enable external tools" earlier, IntelliJ automatically places that tiny Wrench and Hammer icon right on the top toolbar of that window. Clicking that button manually triggers our run-word-diff.bat script on demand.