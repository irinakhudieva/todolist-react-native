import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import useTodoList from '../hooks/todo.list.hook';

export default function TodoCreate() {
    const { todoText, setTodoText, addTodo } = useTodoList();

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input} 
                placeholder="Новая задача..."
                value={todoText}
                onChangeText={setTodoText}
            />
            <View style={styles.buttonWrapper}>
                <Pressable style={styles.button} onPress={addTodo}>
                    <Image 
                        style={styles.addIcon}
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/143/143506.png' }} 
                    />
                </Pressable>
            </View>
        </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    input: {
        height: 60,
        backgroundColor: '#fff',
        marginBottom: 20,
        padding: 10,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        flex: 1,
        fontSize: 18
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 60,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        marginBottom: 30,
    },
    textButton: {
        color: '#fff',
        textTransform: 'uppercase'
    },
    addIcon: {
        width: 34,
        height: 34
    }
})