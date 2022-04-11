import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import TaskListView from "../components/TaskListView";
import { readTasksFromFirebaseAsync } from "../services/FirebaseApi";

const DoneTasks = (props) => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
      readTasksFromFirebaseAsync((value) => fetchTasks(value)).then()
  }, [])

  const fetchTasks = (allTasks) => {
    if(!allTasks) return;
    const tasksDone = allTasks.filter(t => t.isDone)
    setTasks(tasksDone)
  }

  return (
    <View style={styles.container}>
      {
        !!tasks && tasks.length > 0 &&
        <TaskListView tasks={tasks} navigation={props.navigation}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column', paddingHorizontal: 10 },
  icon: { width: 26, height: 26 },
  img: { width: 50, height: 50 }
})

export default DoneTasks
