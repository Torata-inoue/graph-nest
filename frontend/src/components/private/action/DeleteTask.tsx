import React from "react";
import {IconButton, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useMutation} from "@apollo/client";
import {DELETE_TASK} from "../../../mutations/taskMutation.ts";
import {GET_TASKS} from "../../../queries/taskQueries.ts";
import {useNavigate} from "react-router-dom";

type DeleteTaskProps = {id: number; userId: number};
const DeleteTask: React.FC<DeleteTaskProps> = ({id, userId}) => {
  const [deleteTask] = useMutation<{deleteTask: number}>(DELETE_TASK);
  const navigate = useNavigate();
  const handleDeleteTask = async () => {
    const deleteTaskInput = {id};
    try {
      await deleteTask({
        variables: {deleteTaskInput},
        refetchQueries: [{query: GET_TASKS, variables: {userId}}]
      })
      alert('タスクが削除されました');
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        localStorage.removeItem('token');
        alert('トークンの有効期限が切れました。サインイン画面に遷移します');
        navigate('/signin');
        return;
      }
      alert('タスクの削除に失敗しました。');
    }
  }
  return (
    <div>
      <Tooltip title="削除">
        <IconButton onClick={handleDeleteTask}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default DeleteTask;
