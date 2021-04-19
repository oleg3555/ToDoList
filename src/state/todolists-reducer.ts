import {filterType, TypeForTodoList} from "../App";
import {v1} from "uuid";

type removeTodoListActionType = {
    type: "REMOVE-TODOLIST"
    todoListId: string;
}
type addTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string;
    todoListId: string
}
type changeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    newTitle: string
    todoListId: string
}
type changeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: filterType
    todoListId: string
}

type ActionType =
    removeTodoListActionType
    | addTodoListActionType
    | changeTodoListTitleActionType
    | changeTodoListFilterActionType

export const todoListId1 = v1();
export const todoListId2 = v1();
const initialState: Array<TypeForTodoList> = [
    {
        id: todoListId1,
        title: "What to learn",
        filter: "all"
    },
    {
        id: todoListId2,
        title: "What to buy",
        filter: "all"
    }

];


export const todoListReducer = (state: Array<TypeForTodoList> = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id !== action.todoListId);
        }
        case "ADD-TODOLIST": {
            const newTodoList: TypeForTodoList = {id: action.todoListId, title: action.title, filter: "all"};
            return [...state, newTodoList];
        }
        case "CHANGE-TODOLIST-TITLE": {
            const newState = [...state];
            const todoList = newState.find(t => t.id === action.todoListId);
            if (todoList) {
                todoList.title = action.newTitle;
            }
            return newState;
        }
        case "CHANGE-TODOLIST-FILTER": {
            const newState = [...state];
            const todoList = newState.find(t => t.id === action.todoListId);
            if (todoList) {
                todoList.filter = action.filter;
            }
            return newState;
        }
        default:
            return state;

    }
};

export const removeTodoListAC = (id: string): removeTodoListActionType => {
    return {type: "REMOVE-TODOLIST", todoListId: id};
};
export const addTodoListAC = (title: string): addTodoListActionType => {
    return {type: "ADD-TODOLIST", todoListId: v1(), title};
};
export const changeTodoListTitleAC = (title: string, id: string): changeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", newTitle: title, todoListId: id};
};
export const changeTodoListFilterAC = (filter: filterType, id: string): changeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter, todoListId: id};
};

