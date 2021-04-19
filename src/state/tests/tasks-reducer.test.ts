import {v1} from "uuid";
import {tasksStateType} from "../../App";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "../tasks-reducer";
import {removeTodoListAC} from "../todolists-reducer";

test("correct task in todolist should be removed", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const startState: tasksStateType = {
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
    const taskId = startState[todoListId1][0].id;
    const endState = tasksReducer(startState, removeTaskAC(taskId, todoListId1));
    expect(endState[todoListId1].length).toBe(2);
    expect(endState[todoListId2].length).toBe(5);
    expect(endState[todoListId1][0].title).toBe("JS");
    expect(endState[todoListId2][0].title).toBe("Milk");
});

test("correct task in todolist should be added", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const startState: tasksStateType = {
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
    const endState = tasksReducer(startState, addTaskAC("Git", todoListId1));
    expect(endState[todoListId1].length).toBe(4);
    expect(endState[todoListId2].length).toBe(5);
    expect(endState[todoListId1][0].title).toBe("Git");
    expect(endState[todoListId2][0].title).toBe("Milk");
});

test("correct task in todolist should change status", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const startState: tasksStateType = {
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
    const taskId = startState[todoListId2][3].id;
    const endState = tasksReducer(startState, changeTaskStatusAC(taskId, true, todoListId2));
    expect(endState[todoListId1].length).toBe(3);
    expect(endState[todoListId2].length).toBe(5);
    expect(endState[todoListId2][3].title).toBe("Drinks");
    expect(endState[todoListId2][3].isDone).toBe(true);

});

test("correct task in todolist should change title", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const startState: tasksStateType = {
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
    const taskId = startState[todoListId1][1].id;
    const endState = tasksReducer(startState, changeTaskTitleAC(taskId, "New Title", todoListId1));
    expect(endState[todoListId1].length).toBe(3);
    expect(endState[todoListId2].length).toBe(5);
    expect(endState[todoListId1][1].title).toBe("New Title");

});
test("correct tasks should be removed from removed todolist", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const startState: tasksStateType = {
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
    const endState = tasksReducer(startState, removeTodoListAC(todoListId2));
    expect(endState[todoListId1].length).toBe(3);
    expect(endState[todoListId2]).toBe(undefined);

});



