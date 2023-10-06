import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_TASK } from "../../../mutations/taskMutation.ts";
import { GET_TASKS } from "../../../queries/taskQueries.ts";
import { useMutationApi } from "../../../hooks/useMutationApi.ts";
import { Task } from "../../../types/task.ts";

type DeleteTaskProps = { task: Task; userId: number };
const DeleteTask: React.FC<DeleteTaskProps> = ({
  task: { id, name },
  userId,
}) => {
  const deleteTask = useMutationApi<{ deleteTask: number }>(DELETE_TASK);

  const handleDeleteTask = async () => {
    if (!confirm(`${name}を削除してもよろしいですか？`)) {
      return;
    }
    const deleteTaskInput = { id };
    await deleteTask({ deleteTaskInput }, [
      { query: GET_TASKS, variables: { userId } },
    ]);
    alert("タスクが削除されました");
  };
  return (
    <div>
      <Tooltip title="削除">
        <IconButton onClick={handleDeleteTask}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default DeleteTask;
