var objArgs = WScript.Arguments;
if (objArgs.length < 2) {
    WScript.Echo("Usage: [script] file1.doc file2.doc");
    WScript.Quit(1);
}

// Flipped parameters from gitconfig order: 
// sBaseDoc is now your clean repository baseline ($REMOTE)
// sNewDoc is now your current local working changes ($LOCAL)
var sBaseDoc = objArgs(0);
var sNewDoc = objArgs(1);

var WordApp = new ActiveXObject("Word.Application");
WordApp.Visible = false; 

try {
    // Natively contrast the paths instantly without pre-opening them.
    // This creates exactly ONE visual frame on your screen.
    var diffDoc = WordApp.CompareDocuments(
        WordApp.Documents.Open(sBaseDoc, true, true, false), // Original
        WordApp.Documents.Open(sNewDoc, true, true, false),  // Revised
        1,      // Destination: New Document
        1,      // Granularity: Word level
        false,  // Compare formatting
        true,   // Track moves
        true,   // Track deletions
        true,   // Track insertions
        true,   // Track formatting adjustments
        true,   // Track comments
        true,   // Track headers/footers
        true,   // Track footnotes
        true,   // Track textboxes
        true,   // Track fields
        "Git Revision Tracking", // Author name label
        false   // Do not inherit styles
    );

    // Bring the single track-changes layout directly into focus
    WordApp.Visible = true;
    WordApp.Activate();

    // Fast-polling loop monitoring the single view window frame
    while (true) {
        WScript.Sleep(100);
        try {
            if (!WordApp.Visible || WordApp.Documents.Count === 0) {
                break;
            }
        } catch(loopError) {
            break; // Exit instantly when the Word application process breaks away
        }
    }

} catch(e) {
    // Quietly exit if the error is just Word tearing down its workspace process
    if (e.number !== -2147023174) {
        WScript.Echo("Error during Word comparison routine: " + e.message);
    }
} finally {
    try { WordApp.Quit(0); } catch(q) {}
    WScript.Quit(0);
}
