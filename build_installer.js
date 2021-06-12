// ./build_installer.js

// 1. Import Modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
const APP_DIR = path.resolve(__dirname, './GenshinTool-win32-x64');
const OUT_DIR = path.resolve(__dirname, './windows_installer');
const ICO_DIR = path.resolve(__dirname, './app/ressources/exe-icon.ico')

// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    // Configure metadata
    description: 'Application des gestion pour Genshin Impact',
    exe: 'GenshinTool',
    name: 'Genshin Tool',
    manufacturer: 'Schibo',
    version: '1.0.0',
    appIconPath: ICO_DIR,

    // Configure installer User Interface
    ui: {
        chooseDirectory: true
    },
});

// 4. Create a .wxs template file
msiCreator.create().then(function(){

    // Step 5: Compile the template to a .msi file
    msiCreator.compile();
});