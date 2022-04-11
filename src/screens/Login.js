import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Image,
  TextInput,
  Button,
  Text,
  StyleSheet, Alert,
} from "react-native";
import { signInOnFirebaseAsync } from "../services/FirebaseApi";
import { CommonActions } from "@react-navigation/native";

const img = require('../assets/logo.png');

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function _signInAsync() {
    try {
      const user = await signInOnFirebaseAsync(email, password); Alert.alert(
        'User Authenticated',
        `User ${user.user.email} has succesfuly been authenticated!`,
        [
          {
            text: 'OK',
            onPress: () => props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'TaskList'}],
              }),
            )},
        ],
      );
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.topView}>
        <Image style={styles.img} source={img} />
      </View>
      <View style={styles.bottomView}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType={'email-address'}
          autoCapitalize="none"
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
        />
        <Button title="Sign In" onPress={() => _signInAsync()} />
        <View style={styles.textConteiner}>
          <Text>Not a member? Let's </Text>
          <Text onPress={() => props.navigation.navigate('Register')} style={styles.textRegister}>Register</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  img: {
    width: 200,
    height: 200,
  },
  bottomView: {
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
  },
  input: {
    marginBottom: 20,
  },
  textConteiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textRegister: {fontWeight: 'bold'},
});

export default Login;
