import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const SelectMention: React.FC = React.memo(() => {
  return (
    <>
      <DialogTitle>タイトル</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel>toをつける相手を選択</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={
              <>
                <EditIcon /> ユーザーA
              </>
            } />
          </FormGroup>
        </FormControl>
        <DialogActions>
          <Button type="submit">次へ</Button>
        </DialogActions>
      </DialogContent>
    </>
  );
}, [])

export default SelectMention;
