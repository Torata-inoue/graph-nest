import React, {useState} from 'react';
import Button from '@mui/material/Button';
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
import InlineTextInput from "../../inputs/InlineTextInput.tsx";
import MultilineInput from "../../inputs/MultilineInput.tsx";
import SelectInput from "../../inputs/SelectInput.tsx";
import {MenuItem} from "@mui/material";

type AddTaskProps = {userId: number};
const AddTask: React.FC<AddTaskProps> = ({userId}) => {
  const [open, setOpen] = useState(false);
  const {register, reset, formState: {errors}, handleSubmit, control} = useAddTask(userId);
  const createTask = useMutationApi<{createTask: Task}>(CREATE_TASK);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    await createTask({createTaskInput: {
      ...data,
      isTask: Boolean(data.isTask),
      dayOfWeek: parseInt(data.dayOfWeek)
    }}, [{query: GET_TASKS, variables: {userId}}]);
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

        </Box>
      </Dialog>
    </div>
  );
}

export default AddTask;
