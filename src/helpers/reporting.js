import * as Sentry from '@sentry/react-native';
import CodePush from 'react-native-code-push';

import appConfig from 'config';

let reportingInitialized = false;

const init = async () => {
  if (!appConfig.reportErrors) {
    return;
  }

  const codePushUpdate = appConfig.codePushKey ? await CodePush.getUpdateMetadata() : null;

  Sentry.init({
    dsn: appConfig.sentryDSN,
    environment: appConfig.env,
    react: true,
    codePushVersion: codePushUpdate ? codePushUpdate.label : '',
  });

  reportingInitialized = true;
};

const identifyApp = (appVersion) => {
  if (!reportingInitialized) {
    return;
  }

  if (appVersion) {
    Sentry.setRelease(appVersion);
  }
};

const identifyUser = (userId, email = null) => {
  if (!reportingInitialized) {
    return;
  }

  const userData = {
    id: userId ? userId.toString() : null,
    email: email ? email.toString() : null,
  };

  if (userData.id || userData.email) {
    Sentry.setUser(userData);
  }
};

const reportError = (error) => {
  if (!reportingInitialized) {
    return;
  }

  if (error instanceof Error) {
    Sentry.captureException(error);
  } else if (typeof error === 'string') {
    Sentry.captureMessage(error);
  } else if (error) {
    Sentry.captureMessage(JSON.stringify(error));
  }
};

export default { init, identifyApp, identifyUser, reportError };
