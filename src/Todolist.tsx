import React, {useCallback} from 'react';
import {filterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

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
    }, [dispatch, props.todoListId]);

    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    };

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListId);
    }, [props.todoListId,props.changeTodoListTitle]);

    const tasksToDisplay = tasks.map(t => {
        return (
            <Task
                key={t.id}
                todoListId={props.todoListId}
                task={t}
            />
        )
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
