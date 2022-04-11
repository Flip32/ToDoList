import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import TaskListView from "../components/TaskListView";
import { readTasksFromFirebaseAsync } from "../services/FirebaseApi";

const imgChecList = require('../assets/logo.png') // TODO - Mudar imagem

const ToDoTasks = (props) => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    readTasksFromFirebaseAsync((value) => fetchTasks(value)).then()
  }, [])

  useEffect(() => {
      console.log('==============================')
      console.log(`tasks`, tasks)

  }, [tasks])

  function goToTask() { props.navigation.navigate('Task') }

  async function fetchTasks(allTasks) {
    const tasksToDo = allTasks.filter(t => !t.isDone);
    setTasks(tasksToDo);
  }

  return (
    <View style={styles.container}>
      {
        !!tasks &&
        <TaskListView tasks={tasks} navigation={props.navigation} />
      }
      <TouchableOpacity
        style={styles.floatButton}
        onPress={goToTask}
      >
        <Image source={imgChecList} style={styles.img} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column', paddingHorizontal: 10 },
  icon: { width: 26, height: 26 },
  img: { width: 50, height: 50 },
  floatButton: {
    position: 'absolute',
    right: 20,
    bottom: 20
  }
})

export default ToDoTasks
