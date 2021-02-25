import React, { useEffect, useState } from 'react';
import codePush from 'react-native-code-push';
import PropTypes from 'prop-types';

import appConfig from 'config';

import SplashScreen from 'components/SplashScreen';

let codePushInitialized = false;
const init = (app) => {
  let finalApp = app;

  if (appConfig.codePushKey) {
    finalApp = codePush({
      deploymentKey: appConfig.codePushKey,
      checkFrequency: codePush.CheckFrequency.MANUAL,
    })(finalApp);
    codePushInitialized = true;
  }

  return finalApp;
};

const manualUpdate = async () => {
  if (!codePushInitialized) {
    return Promise.resolve();
  }

  return codePush.sync({
    deploymentKey: appConfig.codePushKey,
    installMode: codePush.InstallMode.IMMEDIATE,
  });
};

const MIN_SPLASH_TIME = 2000; // in milliseconds

let time;
const CodePushProvider = ({ children }) => {
  const [updatingBundle, setUpdatingBundle] = useState(true);

  const finishUpdate = () => {
    const now = new Date();
    const elapsed = now - time;

    setTimeout(() => {
      setUpdatingBundle(false);
    }, Math.max(MIN_SPLASH_TIME - elapsed, 0));
  };

  useEffect(() => {
    time = new Date();

    manualUpdate()
      .then((syncStatus) => {
        if (syncStatus !== codePush.SyncStatus.UPDATE_INSTALLED) {
          finishUpdate();
        }
      })
      .catch(() => {
        finishUpdate();
      });
  }, []);

  return updatingBundle ? <SplashScreen /> : children;
};
CodePushProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

CodePushProvider.init = init;
CodePushProvider.manualUpdate = manualUpdate;

export default CodePushProvider;
