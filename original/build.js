const electronInstaller = require("electron-winstaller");

// NB: Use this syntax within an async function, Node does not have support for
//     top-level await as of Node 12.
build = async () => {
    try {
        await electronInstaller.createWindowsInstaller({
            appDirectory: "./",
            authors: "Can Yildirim",
            exe: "volumeControlUtility_V2.exe",
        });
        console.log("It worked!");
    } catch (e) {
        console.log(`No dice: ${e.message}`);
    }
};
build();
