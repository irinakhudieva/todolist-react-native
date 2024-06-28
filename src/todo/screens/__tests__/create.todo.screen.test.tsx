import useTodoList from "@/todo/hooks/todo.list.hook";
import TodoCreate from "../create.todo.screen";
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('../../hooks/todo.list.hook.ts');

describe('TodoCreate', () => {
    test('renders correctly and interacts with elements', () => {
        const setTodoText = jest.fn();
        const addTodo = jest.fn();

        // Создаем мок для возврата значений
        const mockUseTodoList = useTodoList as jest.MockedFunction<typeof useTodoList>;
        mockUseTodoList.mockReturnValue({
            todoText: '',
            setTodoText,
            addTodo,
            todos: [],
            isLoading: false,
            error: '',
            onChangeCompleted: jest.fn(),
            onRemoveTodo: jest.fn(),
            onEditTodo: jest.fn(),
            onSendToServer: jest.fn(),
        });

        const { getByPlaceholderText, getByRole } = render(<TodoCreate />);

        // Проверяем, что поле ввода отображается правильно
        const input = getByPlaceholderText('Новая задача...');
        expect(input).toBeTruthy();

        // Взаимодействуем с полем ввода
        fireEvent.changeText(input, 'Моя новая задача');
        expect(setTodoText).toHaveBeenCalledWith('Моя новая задача');

        // Проверяем наличие кнопки добавления задачи
        const button = getByRole('button');
        expect(button).toBeTruthy();

        // Взаимодействуем с кнопкой добавления задачи
        fireEvent.press(button);
        expect(addTodo).toHaveBeenCalled();
    });
});
// jest.mock('../../hooks/todo.list.hook.ts', () => ({
//     useTodoList: jest.fn()
// }))

// describe('TodoCreate', () => {
//     test('renders correctly and interacts with elements'), () => {
//         const setTodoText = jest.fn();
//         const addTodo = jest.fn();

//         const mockUseTodoList = useTodoList as jest.MockedFunction<typeof useTodoList>;

//         mockUseTodoList.mockReturnValue({
//             todoText: '',
//             setTodoText,
//             addTodo,
//             todos: [],
//             isLoading: false,
//             error: '',
//             onChangeCompleted: jest.fn(),
//             onRemoveTodo: jest.fn(),
//             onEditTodo: jest.fn(),
//             onSendToServer: jest.fn(),
//         });


//         const { getByPlaceholderText, getByRole } = render(<TodoCreate />);
        
//         const input = getByPlaceholderText('Новая задача...');
//         expect(input).toBeTruthy();

//         fireEvent.changeText(input, 'Моя новая задача');
//         expect(setTodoText).toHaveBeenCalledWith('Моя новая задача');

//         const button = getByRole('button');
//         expect(button).toBeTruthy();

//         fireEvent.press(button);
//         expect(addTodo).toHaveBeenCalled();
//     }
// });