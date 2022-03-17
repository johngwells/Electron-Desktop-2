const path = require('path');
const electron = require('electron');

const TimerTray = require('./app/timer-tray');
const MainWindow = require('./app/main-window');

const { app, ipcMain } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
  // only if you want to remove the app from the dock
  app.dock.hide();

  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('update-timer', (event, timerLeft) => {
  tray.setTitle(timerLeft);
});
