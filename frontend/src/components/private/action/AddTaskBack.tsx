import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Task } from "../../../types/task.ts";
import { CREATE_TASK } from "../../../mutations/taskMutation.ts";
import { GET_TASKS } from "../../../queries/taskQueries.ts";
import { useAddTask } from "../../../hooks/private/useAddTask.ts";
import { useMutationApi } from "../../../hooks/useMutationApi.ts";
import Box from "@mui/material/Box";
import InlineTextInput from "../../inputs/InlineTextInput.tsx";
import MultilineInput from "../../inputs/MultilineInput.tsx";
import SelectInput from "../../inputs/SelectInput.tsx";
import { MenuItem } from "@mui/material";

type AddTaskProps = { userId: number };
const AddTaskBack: React.FC<AddTaskProps> = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    control,
  } = useAddTask(userId);
  const createTask = useMutationApi<{ createTask: Task }>(CREATE_TASK);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await createTask(
      {
        createTaskInput: {
          ...data,
          isTask: Boolean(data.isTask),
          dayOfWeek: parseInt(data.dayOfWeek),
        },
      },
      [{ query: GET_TASKS, variables: { userId } }],
    );
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
      <Button variant="contained" onClick={handleClickOpen} sx={{ width: 270 }}>
        タスク追加
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={onSubmit}>
          <DialogTitle>タスク追加</DialogTitle>
          <DialogContent>
            <InlineTextInput
              placeholder="Task Name"
              error={errors.name}
              register={register("name", {
                required: {
                  value: true,
                  message: "タスク名を入力してください",
                },
              })}
            />
            <MultilineInput placeholder="本文" register={register("body")} />
            <InlineTextInput
              placeholder="ChatworkルームID"
              error={errors.roomId}
              register={register("roomId", {
                required: {
                  value: true,
                  message: "ChatworkルームIDを入力して下さい",
                },
                valueAsNumber: true,
              })}
            />
            {/*TODO chatworkデータを取得したい*/}
            <MultilineInput
              placeholder="toで宛先にしたいchatwork idを入力して下さい"
              register={register("to")}
            />
            <SelectInput
              placeholder="タスク or 通常チャット"
              name="isTask"
              control={control}
            >
              <MenuItem value="1">タスク</MenuItem>
              <MenuItem value="0">通常チャット</MenuItem>
            </SelectInput>
            <InlineTextInput
              placeholder="何時に送信？"
              error={errors.dueTime}
              type="number"
              register={register("dueTime", {
                required: {
                  value: true,
                  message: "何時に送信するかを入力して下さい",
                },
                valueAsNumber: true,
              })}
            />
            {/*TODO 選択肢を広げる*/}
            <SelectInput
              placeholder="毎週何曜日に送信？"
              name="dayOfWeek"
              control={control}
            >
              <MenuItem value="0">日曜日</MenuItem>
              <MenuItem value="1">月曜日</MenuItem>
              <MenuItem value="2">火曜日</MenuItem>
              <MenuItem value="3">水曜日</MenuItem>
              <MenuItem value="4">木曜日</MenuItem>
              <MenuItem value="5">金曜日</MenuItem>
              <MenuItem value="6">土曜日</MenuItem>
            </SelectInput>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default AddTaskBack;
