# FitnessCalculator

## Description and Requirements
Simple body mass index and body fat percentage calculator, in Electron.

NOTE: currently supports Metric units only!

Requires Node.js.

Electron apps can run on Windows, Mac and Linux.

## Contents
* `index.html` - defines structure of document in main window
* `main.js` - main process
* `renderer.js` - executed in the renderer process for the main window
* `styles.css` - applies styling to the HTML document

## Installation and Setup
For a quick guide to downloading and running this app, refer to "Usage".

`electron-packager` is used to package the application. Use one of the following commands:
```
npm run package-win

npm run package-mac

npm run package-linux
```

The scripts executed by the above commands are found in `package.json`.

## Architecture
This is a simple Electron app. In a nutshell, Electron apps have two processes:
* main process - runs web pages
* renderer process - each web page runs in its own isolated process called the renderer process

## Usage
1. Clone this repo:
`git clone https://github.com/Alc2110/BodyCalculator.git`

2. Change directory to where the repo was cloned.

3. Install dependencies with npm: `npm install`

4. Run the app: `npm start`

## Attributions

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
