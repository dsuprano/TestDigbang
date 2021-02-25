import React, { useState, useEffect } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import CodePush from 'react-native-code-push';

import ReportingHelper from 'helpers/reporting';

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 50,
  },
  bottomText: {
    color: '#000',
    fontSize: 11,
    opacity: Platform.select({
      ios: 0.6,
      android: 0.2,
    }),
  },
};

const SplashScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    setMounted(true);

    CodePush.getUpdateMetadata()
      .then((updateMetadata) => {
        if (updateMetadata) {
          ReportingHelper.identifyApp(`${updateMetadata.appVersion}-codepush:${updateMetadata.label}`);

          if (mounted) {
            setMetadata(updateMetadata);
          }
        }
      })
      .catch(() => {});

    return () => {
      setMounted(false);
    };
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator color="#000" />
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>
          {metadata ? `Version ${metadata.appVersion} - Build ${metadata.label}` : 'Bundled'}
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
