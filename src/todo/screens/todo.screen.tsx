import { SafeAreaView, StyleSheet } from "react-native";
import TodoCreate from "./create.todo.screen";
import TodoList from "./list.todo.screen";
import { useIsConnectedToNetwork } from "@/offline/hooks/isOnline.hook";
import { useAppDispatch } from "@/shared/store/hooks/redux";
import { useEffect } from "react";
import { loadUnsavedItems, setIsOnline } from "@/offline/store/reducers/offline.reducer";


export default function Todo() {
    const { isConnectedStatus } = useIsConnectedToNetwork();

    const dispatch = useAppDispatch();
  
    console.log('isConnectedStatus', isConnectedStatus);

    useEffect(() => {
        dispatch(setIsOnline(isConnectedStatus));
    }, [isConnectedStatus]);

    useEffect(() => {
        dispatch(loadUnsavedItems());
    }, []);
      
    return (
        <SafeAreaView style={styles.container}>
            <TodoCreate />
            <TodoList />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        backgroundColor: '#2d2c36',
        padding: 20
    },
    linkUnsaved: {
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
    }
})
