const electron = require('electron');
const url = require('url');
const path = require('path');
const { remote } = require('electron');

const { app, BrowserWindow, Menu } = electron;

// SET ENV
process.env.NODE_ENV = 'production'; // uncomment this to use dev mode

let mainWindow;
let aboutBox;

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
        submenu:
        [
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 
                'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Help',
        submenu:
        [
            {
                label: 'About',
                click() {
                    // show about box
                    // create window
                    aboutBox = new BrowserWindow({
                        width: 400,
                        height: 325,
                        title: 'About FitnessCalculator',
                        parent: mainWindow,
                        show: true,
                        modal: true,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false,
                            enableRemoteModule: true
                        }
                    });
                    aboutBox.setMenuBarVisibility(false);
                    aboutBox.resizable = false;
                    aboutBox.minimizable = false;
                    // load HTML
                    aboutBox.loadURL(url.format({
                        pathname: path.join(__dirname, '/about_box/about.html'),
                        protocol: 'file:',
                        slashes: true
                    }));
                    // garbage collection
                    aboutBox.on('close', () => {aboutBox=null;})
                }
            }
        ]
    }
];

// if on Mac, add empty object to menu (by default the first menu item is "Electron")
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// add developer tools item if not in production
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:
        [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' :
                'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}
