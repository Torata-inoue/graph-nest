import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Task} from "../../../types/task.ts";
import {CREATE_TASK} from "../../../mutations/taskMutation.ts";
import {GET_TASKS} from "../../../queries/taskQueries.ts";
import {useAddTask} from "../../../hooks/private/useAddTask.ts";
import {useMutationApi} from "../../../hooks/useMutationApi.ts";
import Box from "@mui/material/Box";

type AddTaskProps = {userId: number};
const AddTask: React.FC<AddTaskProps> = ({userId}) => {
  const [open, setOpen] = useState(false);
  const {register, reset, formState: {errors}, handleSubmit} = useAddTask(userId);
  const createTask = useMutationApi<{createTask: Task}>(CREATE_TASK);

  const onSubmit = handleSubmit(async (data) => {
    await createTask({createTaskInput: data}, [{query: GET_TASKS, variables: {userId}}]);
    reset();
    setOpen(false);
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{width: 270}}>
        タスク追加
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={onSubmit}>
          <DialogTitle>タスク追加</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              id="name"
              label="Task Name"
              fullWidth
              required
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register('name', {
                required: {value: true, message: 'タスク名を入力してください'}
              })}
            />
            <TextField
              autoFocus
              margin="normal"
              id="dueDate"
              label="YYYY-MM-DD"
              fullWidth
              required
              error={Boolean(errors.dueDate)}
              helperText={errors.dueDate?.message}
              {...register('dueDate', {
                required: {value: true, message: '日付を入力してください'}
              })}
            />
            <TextField
              autoFocus
              margin="normal"
              id="description"
              label="description"
              fullWidth
              multiline
              rows={4}
              {...register('description')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default AddTask;
