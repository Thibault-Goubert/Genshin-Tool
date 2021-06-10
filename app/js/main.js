// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')



function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1730,
    height: 915,
    webPreferences: {
      preload: path.join(__dirname, 'app/js/preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('app/app.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Certaines APIs peuvent être utilisées uniquement quant cet événement est émit.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

// In this file you can include the rest of your app's specific main process
// code. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
