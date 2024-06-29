import { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, View } from "react-native";
import { useAppDispatch } from "@/shared/store/hooks/redux";
import { fetchAllTodos } from "../store/reducers/todo.reducer";
import TodoItem from "./item.todo.screen";
import Loader from "@/shared/ui/loader/loader";
import useTodoList from "../hooks/todo.list.hook";
import FilterTodo from "./filter.todo.screen";
import useFilterTodo from "../hooks/filter.todo.hook";
import { useSelector } from "react-redux";
import { getIsOfflineLoader } from "@/offline/store/selectors/getIsOfflineLoader";
import { loadUnsavedItems } from "@/offline/store/reducers/offline.reducer";
import { getOfflineItems } from "@/offline/store/selectors/getOfflineItems";


export default function TodoList() {
    const dispatch = useAppDispatch();
    const { isLoading, error } = useTodoList();
    const { filteredTodos, handleFilterChange } = useFilterTodo();
    const isOfflineLoading = useSelector(getIsOfflineLoader);
    const offlineItems  = useSelector(getOfflineItems)

    useEffect(() => {
        if(offlineItems.length) {
            dispatch(loadUnsavedItems());
        }
        else {
            dispatch(fetchAllTodos());
        }
    }, [dispatch]);

    useEffect(() => {
        if (!isOfflineLoading) {
            dispatch(fetchAllTodos());
        }
    }, [dispatch, isOfflineLoading]);

    if (isOfflineLoading || isLoading) return <Loader />;

    if(error) {
        Alert.alert('Ошибка', 'Не удалость получить список todo')
    }

    return (
        <View>
            <FilterTodo handleFilterChange={handleFilterChange} />
            <FlatList 
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchAllTodos} />} 
                data={filteredTodos}
                renderItem={({item}) => (
                    <TodoItem
                        todo={item?.todo} 
                        id={item?.id}
                        completed={item?.completed}
                        isSended={item?.isSended}
                    /> 
                )}   
                keyExtractor={item => item?.id}
            />
        </View>
    )
}

