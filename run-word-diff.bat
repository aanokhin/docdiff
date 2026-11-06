@echo off
echo Extracting LFS files and launching Word...
:: The /wait flag forces the command prompt to pause until wscript is fully closed
start /wait "" wscript.exe //E:javascript "C:\An\Scripts\diff-doc.js" "%~f1" "%~f2" //nologo
