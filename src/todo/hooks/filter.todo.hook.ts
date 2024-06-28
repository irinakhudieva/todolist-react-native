import { useAppDispatch } from "@/shared/store/hooks/redux";
import { useSelector } from "react-redux";
import { FilterTodo, setFilter } from "../store/reducers/todo.reducer";
import { StateSchema } from "@/shared/store";

export default function useFilterTodo() {
    const dispatch = useAppDispatch();
    const todos = useSelector((state: StateSchema) => state.todo.todos);
    const filter = useSelector((state: StateSchema) => state.todo.filter);
  
    const handleFilterChange = (newFilter: FilterTodo) => {
      dispatch(setFilter(newFilter));
    }

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') {
          return todo;
        } else if (filter === 'unsaved') {
          return !todo.isSended;
        } 
    });

    return {
        handleFilterChange,
        filteredTodos
    }
}