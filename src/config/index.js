import { Platform } from 'react-native';
import RNConfig from 'react-native-config-bridge';
import { get as _get } from 'lodash';

import * as configs from './configs';

const env = _get(RNConfig, 'ENV_NAME', 'development');
const config = configs[env];

console.log(`[${config.appName}] Environment detected: ${env}`); // eslint-disable-line no-console

export default {
  env,
  ...config,
  codePushKey: Platform.select({
    ios: config.codePushKeyIos,
    android: config.codePushKeyAndroid,
  }),
};
