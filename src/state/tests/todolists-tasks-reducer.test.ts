import {tasksStateType, TypeForTodoList} from "../../App";
import {addTodoListAC, todoListReducer} from "../todolists-reducer";
import {tasksReducer} from "../tasks-reducer";

test("correct task array in new todolist must exist", () => {
    const startTasksState: tasksStateType = {};
    const startTodoListsState: Array<TypeForTodoList> = [];
    const action = addTodoListAC("new list");
    const endTasksState = tasksReducer(startTasksState, action);
    const endTodoListsState = todoListReducer(startTodoListsState, action);

    const keys=Object.keys(endTasksState);
    expect(keys[0]).toBe(action.todoListId);
    expect(endTodoListsState[0].id).toBe(action.todoListId)

});