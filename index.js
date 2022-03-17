const path = require('path');
const electron = require('electron');

const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new Tray(iconPath);

  tray.on('click', (event, bounds) => {
    const { x, y } = bounds;
    // when a user resizes the window getBounds will updated height/width
    console.log(mainWindow.getBounds())
    const { width, height } = mainWindow.getBounds();

    if (mainWindow.isVisible()) {
      mainWindow.hide(); 
    } else {
      mainWindow.setBounds({
        x: x - width / 2, y: 23, width, height,
      })
      mainWindow.show();
    }
  });
});
