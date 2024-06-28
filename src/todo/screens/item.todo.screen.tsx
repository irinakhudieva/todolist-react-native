import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import useTodoList from "../hooks/todo.list.hook";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/shared/store/hooks/redux";
import { setUpdateTodo } from "../store/reducers/todo.reducer";


interface TodoItemProps {
    todo: string;
    id: string;
    completed: boolean;
    isSended: boolean;
}

export default function TodoItem({ todo, id, completed, isSended }: TodoItemProps) {
  const [editMode, setEditMode] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch()
  
  const { 
      onChangeCompleted, 
      onRemoveTodo, 
      onEditTodo,
      onSendToServer  
  } = useTodoList();
 
  const handleSaveEdit = () => {
    onEditTodo(id, todo); 
    setEditMode(false); 
  }

  const handleEditMode = () => {
    setEditMode(true); 
  }

  const handleChangeText = (editText: string) => {
    dispatch(setUpdateTodo({id, editText})); 
  };

  useEffect(() => {
      if (editMode) {
        textInputRef.current?.focus();
      } else {
        textInputRef.current?.blur();
      }
    }, [editMode]);

  return (
    <View style={!isSended ? styles.todoUnsavedConteiner : styles.todoConteiner} >
        <View style={styles.todoItem}>
            <TouchableOpacity style={styles.checkbox} onPress={() => onChangeCompleted(id, completed)}>
                <View>
                    {completed && (
                        <Image 
                            style={styles.todoCheck}
                            source={{ uri: 'https://cdn-icons-png.freepik.com/512/9136/9136003.png' }} 
                        />
                    )} 
                </View>
            </TouchableOpacity>
            <TextInput
                ref={textInputRef}
                style={styles.editInput}
                value={todo}
                editable={editMode}
                onChangeText={handleChangeText}
                selectionColor={'#60aee6'}
            />
        </View>
        <View style={styles.iconContainer}>
          {isSended === false && (
              <TouchableOpacity onPress={() => onSendToServer(id)}>
                  <Image 
                      style={styles.todoIcon}
                      source={{ uri: 'https://icons.veryicon.com/png/o/miscellaneous/wasteapp/refresh-348.png' }}  
                  />
              </TouchableOpacity>
        
          )}
          {
            editMode ? (
              <TouchableOpacity onPress={handleSaveEdit}>
                  <Image 
                      style={styles.todoIcon}
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4204/4204493.png' }}  
                  />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleEditMode}>
                  <Image 
                      style={styles.todoIcon}
                      source={{ uri: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/edit-247.png' }}  
                  />
              </TouchableOpacity>
            )
          }
              <TouchableOpacity onPress={() => onRemoveTodo(id)}>
                  <Image 
                    style={styles.todoIcon}
                    source={{ uri: 'https://cdn-icons-png.freepik.com/256/216/216658.png?semt=ais_hybrid' }}  
                  />
              </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  todoConteiner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#3f3e4a',
    borderColor: '#706f7a',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15, 
  },
  todoUnsavedConteiner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#',
    borderColor: '#706f7a',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15, 
    opacity: 0.7,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  todoText: {
    fontSize: 20,
    color: '#edebed',
    flex: 1
  },
  checkbox: {
    width: 23,
    height: 23,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginRight: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  todoCheck: {
    width: 25,
    height: 25
  }, 
    todoIcon: {
    color: '#000',
    width: 30,
    height: 30,
    marginLeft: 10
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  editInput: {
    fontSize: 20,
    color: '#edebed',
    flex: 1
  }
});
