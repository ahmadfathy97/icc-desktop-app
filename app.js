const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');
let  mainMenu;
const menuBar = [];
function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: './assets/icc.png',
  });
  win.maximize();
  mainMenu = new Menu.buildFromTemplate(menuBar);
  Menu.setApplicationMenu(mainMenu);
  win.on('closed', ()=>{
    app.quit();
  });
  // and load the index.html of the app.
  win.loadFile(__dirname + '/index.html')
  // win.loadURL(url.format({
  //     pathname: path.join(__dirname + '/index.html'),
  //     protocol: 'file',
  //     slashes: true,
  //     query: {
  //       name: 'ram'
  //     }
  // }));
}

app.on('ready', createWindow)
