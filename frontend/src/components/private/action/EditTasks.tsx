import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Task } from "../../../types/task.ts";
import { UPDATE_TASK } from "../../../mutations/taskMutation.ts";
import { GET_TASKS } from "../../../queries/taskQueries.ts";
import { useEditTask } from "../../../hooks/private/useEditTask.ts";
import { useMutationApi } from "../../../hooks/useMutationApi.ts";
import Box from "@mui/material/Box";
import TaskPaneRouter from "./panes/TaskPaneRouter.tsx";

type EditTaskProps = { task: Task; userId: number };
const EditTask: React.FC<EditTaskProps> = ({ task, userId }) => {
  const [open, setOpen] = useState(false);
  const methods = useEditTask(task);
  const updateTask = useMutationApi<{ updateTask: Task }>(UPDATE_TASK);

  const onSubmit = methods.handleSubmit(async (data) => {
    await updateTask({ updateTaskInput: { ...data, id: task.id } }, [
      { query: GET_TASKS, variables: { userId } },
    ]);
    setOpen(false);
  });

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
          <TaskPaneRouter
            useFormMethods={methods}
            title={`${task.name}の編集`}
          />
        </Box>
      </Dialog>
    </div>
  );
};

export default EditTask;
