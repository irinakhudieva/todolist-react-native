import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FilterTodoProps {
    handleFilterChange: (newFilter: string) => void;
}
export default function FilterTodo({handleFilterChange}: FilterTodoProps) {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleFilterChange('all')} style={styles.button}>
                <Text style={{color: '#edebed', fontSize: 18}}>Все</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterChange('unsaved')} style={styles.button}>
                <Text style={{color: '#edebed', fontSize: 18}}>Несохраненные</Text>
            </TouchableOpacity>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 15, 
    },
    button: {
        height: 45,
        width: 170,
        backgroundColor: '#636273',
        borderRadius: 8,
        marginLeft: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#706f7a',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 20
    },
    
});
  