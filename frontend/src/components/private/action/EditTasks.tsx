import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {Task} from "../../../types/task.ts";
import {UPDATE_TASK} from "../../../mutations/taskMutation.ts";
import {GET_TASKS} from "../../../queries/taskQueries.ts";
import {useEditTask} from "../../../hooks/private/useEditTask.ts";
import {useMutationApi} from "../../../hooks/useMutationApi.ts";
import Box from "@mui/material/Box";
import {Controller} from "react-hook-form";

type EditTaskProps = {task: Task, userId: number};
const EditTask: React.FC<EditTaskProps> = ({task, userId}) => {
  const [open, setOpen] = useState(false);
  const {register, reset, formState: {errors}, handleSubmit, control} = useEditTask(task);
  const updateTask = useMutationApi<{updateTask: Task}>(UPDATE_TASK);

  const handleReset = () => {
    reset();
  }

  const onSubmit = handleSubmit(async (data) => {
    await updateTask({updateTaskInput: data},[{query: GET_TASKS, variables: {userId}}]);
    setOpen(false);
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="編集">
        <IconButton onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
        <Box component="form" onSubmit={onSubmit}>
          <DialogTitle>タスク編集</DialogTitle>
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
                required: {value: true, message: '名前を入力してください'}
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
                required: {value: true, message: '日付を入力して下さい'}
              })}
            />
            <FormControl fullWidth={true} margin="normal">
              <InputLabel id="task-status-label">ステータス</InputLabel>
              <Controller
                name="status"
                control={control}
                render={({field}) => (
                  <Select
                    labelId="task-status-label"
                    id="task-status"
                    label="Status"
                    {...field}
                  >
                    <MenuItem value="NOT_STARTED">Not Started</MenuItem>
                    <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                    <MenuItem value="COMPLETED">Complete</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
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
            <Button onClick={handleReset}>元に戻す</Button>
            <Button type="submit">送信</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default EditTask;
