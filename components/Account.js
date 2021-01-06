import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { useEasybase } from 'easybase-react';

const Account = () => {
  const [userVal, setUserVal] = useState('');
  const [passVal, setPassVal] = useState('');
  const [error, setError] = useState(null);

  const { signIn, signUp } = useEasybase();

  const clearInputs = () => {
    setUserVal('');
    setPassVal('');
  };

  const handleSignInPress = async () => {
    const response = await signIn(userVal, passVal);

    if (!response.success) {
      setError(response.message);
    } else clearInputs();
  };

  const handleSignUpPress = async () => {
    const res = await signUp(userVal, passVal, {
      'created-at': new Date().toString()
    });

    if (!res.success) {
      setError(res.message);
    } else {
      clearInputs();
      await signIn(userVal, passVal);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to React-flix!</Text>
      <TextInput
        value={userVal}
        onChangeText={e => setUserVal(e)}
        placeholder="Username"
        style={styles.accountInput}
      />
      <TextInput
        value={passVal}
        onChangeText={e => setPassVal(e)}
        placeholder="Password"
        style={styles.accountInput}
        secureTextEntry
      />
      {error && <Text style={styles.error_message}>{error}</Text>}
      <View style={styles.button_container}>
        <TouchableOpacity style={styles.button} onPress={handleSignInPress}>
          <Text style={styles.button_text}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
          <Text style={styles.button_text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  accountInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '75%',
    margin: 10,
    fontSize: 18,
    textAlign: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    fontStyle: 'italic',
    marginBottom: 30
  },
  button_container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 25
  },
  error_message: {
    color: 'red'
  },
  button: {
    color: 'white',
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 5,
    borderRadius: 2
  },
  button_text: {
    color: 'white',
    textTransform: 'uppercase'
  }
});

export default Account;
