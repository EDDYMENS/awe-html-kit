module.exports = {
  launch: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  },
  server: {
    command: "node server.js",
    // port: 4443,
    launchTimeout: 50000
  }
};
