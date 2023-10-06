import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, MenuItem, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Task } from "../../../types/task.ts";
import { UPDATE_TASK } from "../../../mutations/taskMutation.ts";
import { GET_TASKS } from "../../../queries/taskQueries.ts";
import { useEditTask } from "../../../hooks/private/useEditTask.ts";
import { useMutationApi } from "../../../hooks/useMutationApi.ts";
import Box from "@mui/material/Box";
import InlineTextInput from "../../inputs/InlineTextInput.tsx";
import MultilineInput from "../../inputs/MultilineInput.tsx";
import SelectInput from "../../inputs/SelectInput.tsx";

type EditTaskProps = { task: Task; userId: number };
const EditTask: React.FC<EditTaskProps> = ({ task, userId }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    control,
  } = useEditTask(task);
  const updateTask = useMutationApi<{ updateTask: Task }>(UPDATE_TASK);

  const handleReset = () => {
    reset();
  };

  const onSubmit = handleSubmit(async (data) => {
    await updateTask({ updateTaskInput: data }, [
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
          <DialogTitle>タスク編集</DialogTitle>
          <DialogContent>
            <InlineTextInput
              placeholder="Task Name"
              error={errors.name}
              register={register("name", {
                required: { value: true, message: "名前を入力して下さい" },
              })}
            />
            <InlineTextInput
              placeholder="YYYY-MM-DD"
              error={errors.dueDate}
              register={register("dueDate", {
                required: { value: true, message: "日付を入力して下さい" },
              })}
            />
            <SelectInput control={control} placeholder="ステータス">
              <MenuItem value="NOT_STARTED">Not Started</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="COMPLETED">Complete</MenuItem>
            </SelectInput>
            <MultilineInput
              placeholder="description"
              register={register("description")}
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
};

export default EditTask;
