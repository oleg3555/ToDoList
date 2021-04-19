import React from "react";
import './App.css';
import {Todolist} from './Todolist';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = "all" | "active" | "completed"

export type TypeForTodoList = {
    id: string
    title: string
    filter: filterType
}

export type tasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TypeForTodoList>>(state => state.todoLists);

    function addTodoList(title: string) {
        dispatch(addTodoListAC(title));
    }

    function changeTodoListTitle(title: string, todoListId: string) {
        dispatch(changeTodoListTitleAC(title, todoListId));
    }

    function changeTodolistFilter(filter: filterType, todoListId: string) {
        dispatch(changeTodoListFilterAC(filter, todoListId));
    }

    function removeTodoList(todoListId: string) {
        dispatch(removeTodoListAC(todoListId));
    }

    const tLists = todoLists.map(tl => {
        return (
            <Grid item>
                <Paper style={{padding: "10px"}}>
                    <Todolist
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        changeTodolistFilter={changeTodolistFilter}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    });

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {tLists}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
