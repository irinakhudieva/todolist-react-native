import { store } from '@/shared/store';
import Todo from '@/todo/screens/todo.screen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { Provider } from 'react-redux';

export default function App() {
  
  return (
    <Provider store={store}>
        <Text style={styles.title}>ToDo App</Text>
        <Todo />
        <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  title: {
      fontSize: 25,
      color: '#edebed',
      textAlign: 'center',
      paddingTop: 30,
      backgroundColor: '#2d2c36'
  }, 
})
