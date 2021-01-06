import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { EasybaseProvider, useEasybase } from 'easybase-react';
import ebconfig from './ebconfig';

import Account from './components/Account';

export default function App() {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <Router />
    </EasybaseProvider>
  );
}

const Router = () => {
  const { isUserSignedIn, signOut } = useEasybase();

  return isUserSignedIn() ? (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10 }}>Congrats! You're signed in.</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  ) : (
    <Account />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
