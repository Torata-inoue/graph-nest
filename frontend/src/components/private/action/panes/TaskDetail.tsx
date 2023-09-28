import React from "react";
import {FormControl, FormLabel} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const TaskDetail: React.FC = () => {
  return (
    <>
      <DialogTitle>タイトル</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel>タスクの詳細</FormLabel>
          タスクのタイトル<input type="text" />
          メッセージ内容 <textarea name="" id=""></textarea>
        </FormControl>
        <DialogActions>
          <Button type="submit">次へ</Button>
        </DialogActions>
      </DialogContent>
    </>
  )
}

export default TaskDetail;
