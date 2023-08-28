import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const AddTask: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTask;