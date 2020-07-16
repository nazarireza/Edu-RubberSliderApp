const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const appIncludes = [
  resolveApp('src'),
  resolveApp('./node_modules/react-native-reanimated'),
  resolveApp('./node_modules/react-native-gesture-handler'),
];

module.exports = function override(config, env) {
  config.module.rules[0].include = appIncludes;
  config.module.rules[1] = null;
  config.module.rules[2].oneOf[1].include = appIncludes;
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web'),
  ].concat(config.module.rules[2].oneOf[1].options.plugins);
  config.module.rules = config.module.rules.filter(Boolean);
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' })
  );

  return config;
};
