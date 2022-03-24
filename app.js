const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let window = null

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 500px
    width: 750,
    // Set the initial height to 400px
    height: 200,
    minHeight: 200,
    resizable: false,
    minWidth: 750,
    maxHeight: 200,
    maxWidth: 750,
    // set the title bar style
    titleBarStyle: 'hiddenInset',
    // set the background color to black
    // backgroundColor: "#111",
    // Don't show the window until it's ready, this prevents any white flickering
    show: false
  })

  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  window.setMenuBarVisibility(false)

  window.once('ready-to-show', () => {
    window.show()
  })
})
