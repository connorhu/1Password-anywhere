const electron = require('electron')
const path = require('path')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function getDropboxPath()
{
  return [app.getPath('home'), 'Dropbox', '1Password', '1Password.agilekeychain', '1Password.html'].join(path.sep)
}

app.setName('1Password anywhere')

function createWindow () {
  let mainWindowOptions = {
    center: true,
    width: 800,
    height: 600,
    resizable: true,
    fullscreenable: true,
    icon: 'icon.png'
  }
  mainWindow = new BrowserWindow(mainWindowOptions)

  mainWindow.loadURL(['file://', getDropboxPath()].join(''))

  mainWindow.maximize()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
