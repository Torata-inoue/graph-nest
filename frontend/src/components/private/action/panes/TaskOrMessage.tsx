import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

const TaskOrMessage: React.FC = () => {
  return (
    <>
      <DialogTitle>タイトル</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel>タスク or メッセージ？</FormLabel>
          <RadioGroup
            row
            name="isTask"
          >
            <FormControlLabel value={true} control={<Radio />} label="タスクを作成" />
            <FormControlLabel value={false} control={<Radio />} label="メッセージを作成" />
          </RadioGroup>
        </FormControl>
        <DialogActions>
          <Button type="submit">次へ</Button>
        </DialogActions>
      </DialogContent>
    </>
  )
}

export default TaskOrMessage;
