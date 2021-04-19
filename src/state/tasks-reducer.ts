import {tasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {todoListId1, todoListId2} from "./todolists-reducer";

type removeTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
}
type addTaskActionType = {
    type: "ADD-TASK"
    title: string
    todoListId: string
}
type changeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todoListId: string
}
type changeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todoListId: string
}
type addTodoListActionType = {
    type: "ADD-TODOLIST"
    todoListId: string
}
type removeTodoListActionType = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}
type ActionType =
    removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | addTodoListActionType
    | removeTodoListActionType

const initialState: tasksStateType = {
    [todoListId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ],
    [todoListId2]: [
        {id: v1(), title: "Milk", isDone: false},
        {id: v1(), title: "Bread", isDone: false},
        {id: v1(), title: "Meat", isDone: true},
        {id: v1(), title: "Drinks", isDone: false},
        {id: v1(), title: "Sweets", isDone: true},
    ]
};

export const tasksReducer = (state: tasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const newState = {...state};
            newState[action.todoListId] = state[action.todoListId].filter(t => t.id !== action.taskId);
            return newState;
        }
        case "ADD-TASK": {
            const newState = {...state};
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false};
            newState[action.todoListId]=[newTask,...newState[action.todoListId]];
            return newState;
        }
        case "CHANGE-TASK-STATUS": {
            const newState = {...state};
            const taskToChange = newState[action.todoListId].find(t => t.id === action.taskId);
            if (taskToChange) {
                taskToChange.isDone = action.isDone;
            }
            return newState;
        }
        case "CHANGE-TASK-TITLE": {
            const newState = {...state};
            const taskToChange = newState[action.todoListId].find(t => t.id === action.taskId);
            if (taskToChange) {
                taskToChange.title = action.title;
            }
            return newState;
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todoListId]: []};
        }
        case "REMOVE-TODOLIST": {
            const newState = {...state};
            delete newState[action.todoListId];
            return newState;
        }
        default:
            return state;
    }
};

export const removeTaskAC = (taskId: string, todoListId: string): removeTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todoListId};
};

export const addTaskAC = (title: string, todoListId: string): addTaskActionType => {
    return {type: "ADD-TASK", title, todoListId};
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): changeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId, todoListId, isDone};
};

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, todoListId, title};
};



