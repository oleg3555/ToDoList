import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './App.css';
import {TextField} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';

type PropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: PropsType) {
    const [inputValue, setInputValue] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    function addItem() {
        if (inputValue.trim() !== "") {
            props.addItem(inputValue.trim());
            setInputValue("");
        } else {
            setError("Title is required");
            setInputValue("");
        }
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
        setError(null);
    };
    const onInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem();
        }
    };

    return (
        <div>

            <TextField size="small"
                       variant="outlined"
                       label="Type value"
                       value={inputValue}
                       onChange={onInputChange}
                       onKeyPress={onInputKeyPress}
                       error={!!error}
                       helperText={error}
            />
            <AddBoxIcon color="primary" fontSize="large" onClick={addItem}/>
        </div>
    );
}

export default AddItemForm;
