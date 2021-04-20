import React, {ChangeEvent, useCallback} from 'react';
import {filterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type PropsType = {
    todoListId: string
    title: string
    changeTodolistFilter: (filter: filterType, todoListId: string) => void
    filter: filterType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch();
    let tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todoListId]);
    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }
    const setFilterAll = () => props.changeTodolistFilter("all", props.todoListId);
    const setFilterActive = () => props.changeTodolistFilter("active", props.todoListId);
    const setFilterCompleted = () => props.changeTodolistFilter("completed", props.todoListId);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todoListId));
    }, [dispatch,props.todoListId]);

    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    };

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListId);
    }, [props]);

    const tasksToDisplay = tasks.map(t => {
        const removeTask = () => dispatch(removeTaskAC(t.id, props.todoListId));
        const onChangeIsDone = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.todoListId));
        };
        const changeTaskTitle = (title: string) => {
            dispatch(changeTaskTitleAC(t.id, title, props.todoListId));
        };
        return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox checked={t.isDone} onChange={onChangeIsDone}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton size="small" onClick={removeTask} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </div>
        );
    });
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton size="small" onClick={removeTodoList} aria-label="delete">
                    <DeleteForeverIcon color="primary"/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasksToDisplay}
            </div>
            <div>
                <ButtonGroup size="small" variant="text" color="primary" aria-label="text primary button group">
                    <Button color={props.filter === "all" ? "secondary" : "primary"}
                            onClick={setFilterAll}>All
                    </Button>
                    <Button color={props.filter === "active" ? "secondary" : "primary"}
                            onClick={setFilterActive}>Active
                    </Button>
                    <Button color={props.filter === "completed" ? "secondary" : "primary"}
                            onClick={setFilterCompleted}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
});
