import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useMutation} from "@apollo/client";
import {Task} from "../types/task.ts";
import {CREATE_TASK} from "../mutations/taskMutation.ts";
import {GET_TASKS} from "../queries/taskQueries.ts";
import {useNavigate} from "react-router-dom";

type AddTaskProps = {userId: number};
const AddTask: React.FC<AddTaskProps> = ({userId}) => {
  console.log(userId)
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [isInValidName, setIsInvalidName] = useState(false);
  const [isInValidDueDate, setIsInvalidDueDate] = useState(false);
  const navigate = useNavigate();

  const [createTask] = useMutation<{createTask: Task}>(CREATE_TASK);

  const resetState = () => {
    setName('');
    setDueDate('');
    setDescription('');
    setIsInvalidName(false);
    setIsInvalidDueDate(false);
  }

  const handleAddTask = async () => {
    let canAdd = true;

    if (name.length === 0) {
      canAdd = false;
      setIsInvalidName(true);
    } else {
      canAdd = true;
      setIsInvalidName(false);
    }

    if (!Date.parse(dueDate)) {
      canAdd = false;
      setIsInvalidDueDate(true);
    } else {
      canAdd = true;
      setIsInvalidDueDate(false);
    }

    if (canAdd) {
      const createTaskInput = {name, dueDate, description, userId};
      try {
        await createTask({
          variables: {createTaskInput},
          refetchQueries: [{query: GET_TASKS, variables: {userId}}]
        });
        resetState();
        setOpen(false);
      } catch (error: any) {
        if (error.message === 'Unauthorized') {
          localStorage.removeItem('token');
          alert('トークンの有効期限が切れました。サインイン画面に遷移します');
          navigate('/signin');
          return;
        }
        console.log(error)
        alert('タスクの登録に失敗しました');
      }
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetState();
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{width: 270}}>
        タスク追加
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>タスク追加</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Task Name"
            fullWidth
            required
            value={name}
            onChange={e => setName(e.target.value)}
            error={isInValidName}
            helperText={isInValidName && 'タスク名を入力してください'}
          />
          <TextField
            autoFocus
            margin="normal"
            id="dueDate"
            label="YYYY-MM-DD"
            fullWidth
            required
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            error={isInValidDueDate}
            helperText={isInValidDueDate && '日付形式で入力してください'}
          />
          <TextField
            autoFocus
            margin="normal"
            id="description"
            label="description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTask}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTask;
