import {TaskType} from "./App";
import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@material-ui/icons/Delete";

type TaskPropsType = {
    todoListId: string
    task: TaskType
};
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();
    const removeTask = () => dispatch(removeTaskAC(props.task.id, props.todoListId));
    const onChangeIsDone = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todoListId));
    };
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.task.id, title, props.todoListId));
    }, [dispatch, props.task.id, props.todoListId]);
    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox checked={props.task.isDone} onChange={onChangeIsDone}/>
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton size="small" onClick={removeTask} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </div>
    );
});
