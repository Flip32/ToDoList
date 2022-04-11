/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import type {Node} from 'react';
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { currentFirebaseUser } from "../services/FirebaseApi";

const App = (props) => {

  useEffect(() => {
      (async function(){
        let resetNavigation = CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })

        try {
          const user = await currentFirebaseUser()
          console.log('========================================')
          console.log('user', user)
          if (user) {
            props.navigation.dispatch( CommonActions.reset({
              index: 0,
              routes: [{name: 'TaskList'}], }),
            );
          }
          props.navigation.dispatch(resetNavigation);
        } catch (error) {
          props.navigation.dispatch(resetNavigation);
        }

      })()
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 50,
    height: 50
  }
});

export default App;
