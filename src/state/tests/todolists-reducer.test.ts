import {v1} from "uuid";
import {TypeForTodoList} from "../../App";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from "../todolists-reducer";

test("correct todolist should be removed", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const startState: Array<TypeForTodoList> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ];
    const endState = todoListReducer(startState, removeTodoListAC(todoListId1));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test("correct todolist should be added", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const startState: Array<TypeForTodoList> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ];
    const endState = todoListReducer(startState, addTodoListAC("New Title"));
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New Title")
});

test("correct todolist should change filter", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const startState: Array<TypeForTodoList> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ];
    const endState = todoListReducer(startState, changeTodoListFilterAC("completed", todoListId2));
    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe("completed")
});

test("correct todolist should change title", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const startState: Array<TypeForTodoList> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ];
    const endState = todoListReducer(startState, changeTodoListTitleAC("What to cook", todoListId1));
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("What to cook");
    expect(endState[1].title).toBe("What to buy");

});
