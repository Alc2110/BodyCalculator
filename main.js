const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu} = electron;

let mainWindow;

// Listen for app ready
app.on('ready', function(){
    // create window
    mainWindow = new BrowserWindow({
    width: 500,
    height: 800,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
        }
    });

    mainWindow.setResizable(false);

    // load html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // insert menu
    Menu.setApplicationMenu(mainMenu);
});

// create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

// if on Mac, add empty object to menu (by default the first menu item is "Electron")
if (process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// add developer tools item if not in production
if (process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' :
                'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}
