import React from 'react';
import { StatusBar, SafeAreaView, View, Text } from 'react-native';

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
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Digbang - Delvis</Text>
      </View>
    </SafeAreaView>
  </>
);

export default App;
