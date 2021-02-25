import React from 'react';
import { StatusBar, SafeAreaView, View, Text } from 'react-native';

import ReportingHelper from 'helpers/reporting';
import CodePushProvider from 'providers/CodePushProvider';

ReportingHelper.init();

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-ThinItalic',
  },
};

const App = () => (
  <>
    <CodePushProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.text}>Digbang - Delvis</Text>
        </View>
      </SafeAreaView>
    </CodePushProvider>
  </>
);

export default CodePushProvider.init(App);
