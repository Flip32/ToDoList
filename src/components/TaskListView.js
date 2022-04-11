import React from "react";
import { View, SectionList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskListView = ({tasks, navigation}) => {

  console.log('========================================')
  console.log('========================================')
  console.log('========================================')
  console.log('========================================')
  console.log('Ta chegando na lista => ', tasks)
  console.log('========================================')
  console.log('========================================')

  const onClickTask = (task) => {
    navigation.navigate('Task', { task })
  }

  const renderSectionHeader = (sectionData) =>  {
    return (
      <View style={styles.headerConteiner}>
        <View style={styles.headerTagConteiner}>
          <Text style={styles.headerTagText}>{sectionData.section.title.slice(0, 1)}</Text>
        </View>
        <Text style={styles.headerText}>{sectionData.section.title}</Text>
      </View>
    )};

  const renderItem = (itemData) => {
    return (
      <TouchableOpacity onPress={() => onClickTask(itemData.item)}>
        <View style={styles.itemConteiner}>
          <Text style={styles.itemTextTitle}>{itemData.item.title}</Text>
          <Text>{itemData.item.resume}</Text>
        </View>
      </TouchableOpacity> )
  }

  return (
    <>
      {
        tasks && tasks.length > 0 &&
        <SectionList
          renderSectionHeader={(section) => renderSectionHeader(section)}
          sections={[
            {
              data: tasks.filter((data) =>  data.priority ),
              key: "hightPriority",
              title: 'Hight Priority'
            },
            {
              data: tasks.filter((data) =>  !data.priority ),
              key: "lowPriority",
              title: 'Low Priority'
            },
          ]}
          renderItem={(data) => renderItem(data)}
        />
      }
    </>
  )

}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column', paddingLeft: 10, paddingRight: 10 },
  headerConteiner: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'silver', borderRadius: 25, marginTop: 10 },
  headerTagConteiner: { backgroundColor: 'gray', height: 35, width: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 25 },
  headerTagText: { color: '#FFF', fontSize: 22 },
  headerText: { fontSize: 16, marginLeft: 10 },
  itemConteiner: { flex: 1, flexDirection: 'column', backgroundColor: '#F3F2F0', marginTop: 5, padding: 10, height: 75 },
  itemTextTitle: { fontSize: 22 }
});

export default TaskListView
