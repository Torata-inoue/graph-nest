import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const SelectRoom: React.FC = React.memo(() => {
  return (
    <>
      <DialogTitle>タイトル</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel>投稿するチャットルームを選択</FormLabel>
          <RadioGroup name="roomId">
            <FormControlLabel value={1} control={<Radio />} label={
              <>
                <EditIcon /> ルームA
              </>
            } />
          </RadioGroup>
        </FormControl>
        <DialogActions>
          <Button type="submit">次へ</Button>
        </DialogActions>
      </DialogContent>
    </>
  )
}, []);

export default SelectRoom;
