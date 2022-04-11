import React, { useState } from 'react'
import {
    KeyboardAvoidingView,
    View,
    Text,
    Image,
    TextInput,
    Button,
    StyleSheet,
    Alert,
} from 'react-native'
import { createUserOnFirebaseAsync } from "../services/FirebaseApi";
const img = require('../assets/logo.png')

const Register = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function _createUserAsync(){
        try {
            const user = await createUserOnFirebaseAsync(email, password);
            Alert.alert(
              'User Created!', `User ${user.email} has succesfuly been created!`,
              [
                {text: 'OK', onPress: () => props.navigation.goBack()},
              ],
              )
        } catch (error) {
            Alert.alert('Create User Failed!', error.message);
        }
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.topView}>
              <Image style={styles.img} source={img} />
              <Text style={styles.title}>Registering new user</Text>
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
              <Button
                title="Register User"
                onPress={() => _createUserAsync()}
              />
          </View>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    topView: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25,
    },
    img: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    bottomView: {
        flex: 1,
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20,
    },
    input: { marginBottom: 20 },
});

export default Register
