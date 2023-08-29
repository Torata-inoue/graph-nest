import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {Task} from "../types/task.ts";
import {TaskStatus} from "../types/taskStatus.ts";

type EditTaskProps = {task: Task, userId: number};
const EditTask: React.FC<EditTaskProps> = ({task, userId}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(task.name);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState(task.status);
  const [description, setDescription] = useState(task.description);
  const [isInValidName, setIsInvalidName] = useState(false);
  const [isInValidDueDate, setIsInvalidDueDate] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="編集">
        <IconButton onClick={handleClickOpen}><EditIcon></EditIcon></IconButton>
      </Tooltip>
      <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>タスク編集</DialogTitle>
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
          <FormControl fullWidth={true} margin="normal">
            <InputLabel id="task-status-label">ステータス</InputLabel>
            <Select
              labelId="task-status-label"
              id="task-status"
              label="Status"
              value={status}
              onChange={e => setStatus(e.target.value as TaskStatus)}
            >
              <MenuItem value="NOT_STARTED">Not Started</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="COMPLETED">Complete</MenuItem>
            </Select>
          </FormControl>
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
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditTask;
