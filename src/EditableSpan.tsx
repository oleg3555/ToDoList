import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import './App.css';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan=React.memo((props: EditableSpanPropsType)=> {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const exitEditMode = () => {
        if (title.trim() !== "") {
            setEditMode(false);
            props.changeTitle(title);
        } else {
            setError(true);
            setTitle("");
        }
    };
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };
    const activateViewMode = () => {
        exitEditMode();
    };
    const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            exitEditMode();
        }
    };
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setTitle(e.currentTarget.value);
    };

    return editMode
        ? <TextField size="small"
                     variant="outlined"
                     label="Type value"
                     value={title}
                     autoFocus
                     onBlur={activateViewMode}
                     onKeyPress={onKeyPressInput}
                     onChange={onChangeInput}
                     error={error}
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
});
