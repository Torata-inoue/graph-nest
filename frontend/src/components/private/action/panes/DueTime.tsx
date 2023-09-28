import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {FormControl, FormLabel} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const DueTime: React.FC = () => {
  return (
    <>
      <DialogTitle>タイトル</DialogTitle>
      <DialogContent>
        <FormLabel>実行タイミング</FormLabel>
        <FormControl>
          実行タイミング（毎日？毎週？毎月？の何時？）
          （タスクの場合、タスクの期限は何日と何時間後？）
        </FormControl>
        <DialogActions>
          <Button type="submit">次へ</Button>
        </DialogActions>
      </DialogContent>
    </>
  )
}

export default DueTime;
