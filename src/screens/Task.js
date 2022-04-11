import React, { useState } from 'react'
import { View, TextInput, Switch, Text, Button, StyleSheet, Alert } from "react-native";
import { writeTaskOnFirebaseAsync } from "../services/FirebaseApi"

const Task = (props) => {

  const task = props?.route?.params?.task
  const [key, setKey] = useState(task?.key || '');
  const [title, setTitle] = useState(task?.title || '')
  const [resume, setResume] = useState(task?.resume || '')
  const [priority, setPriority] = useState(task?.priority || false)
  const [isDone, setIsDone] = useState(task?.isDone || false)

  async function _saveTaskAsync(){
    const taskToSave = {
      key : key,
      title,
      resume,
      priority,
      isDone,
    }

    try {
      await writeTaskOnFirebaseAsync(taskToSave);
      props.navigation.goBack();
    } catch (error) {
      Alert.alert("Erro Saving", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
                 placeholder='Title'
                 value={title}
                 onChangeText={(value) => setTitle(value)}
      />
      <TextInput style={[styles.input, styles.multilineInput]}
                 placeholder='Resume'
                 multiline={true} numberOfLines={4} value={resume}
                 onChangeText={(value) => setResume(value)}
      />
      <View style={styles.switchContainer}>
        <Switch value={priority} onValueChange={(value) => setPriority(value)} />
        <Text style={styles.switchText}>Hight Priority</Text>
      </View>
      <View style={styles.switchContainer}>
        <Switch value={isDone} onValueChange={(value) => setIsDone(value)} />
        <Text style={styles.switchText}>Is Done?</Text>
      </View>
      <Button style={styles.button} title='Save' onPress={() => _saveTaskAsync()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column', padding: 20, },
  input: { marginBottom: 20, },
  multilineInput: { height: 100, },
  switchContainer: { flexDirection: 'row', alignItems: 'center', paddingBottom: 20, },
  switchText: { marginLeft: 10, color: 'black', fontSize: 18,},
});

export default Task
