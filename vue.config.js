module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        win: {
          "target": ["nsis"],
          icon: 'public/icon.png'
        }
      }
    },
  },
};
