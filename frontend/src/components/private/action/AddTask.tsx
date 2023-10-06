import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Task } from "../../../types/task.ts";
import { CREATE_TASK } from "../../../mutations/taskMutation.ts";
import { GET_TASKS } from "../../../queries/taskQueries.ts";
import { useAddTask } from "../../../hooks/private/useAddTask.ts";
import { useMutationApi } from "../../../hooks/useMutationApi.ts";
import Box from "@mui/material/Box";
import TaskPaneRouter from "./panes/TaskPaneRouter.tsx";

type AddTaskProps = { userId: number };
const AddTask: React.FC<AddTaskProps> = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const methods = useAddTask(userId);
  const createTask = useMutationApi<{ createTask: Task }>(CREATE_TASK);

  const onSubmit = methods.handleSubmit(async (data) => {
    await createTask({ createTaskInput: data }, [
      { query: GET_TASKS, variables: { userId } },
    ]);
    methods.reset();
    setOpen(false);
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    methods.reset();
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{ width: 270 }}>
        タスク追加
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Box component="form" onSubmit={onSubmit}>
          <TaskPaneRouter useFormMethods={methods} title="新規作成" />
        </Box>
      </Dialog>
    </div>
  );
};

export default AddTask;
