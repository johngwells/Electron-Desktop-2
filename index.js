const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer-tray');

const { app, BrowserWindow } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
  // only if you want to remove the app from the dock
  app.dock.hide();

  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on('blur', () => {
    mainWindow.hide();
  });

  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
});
