import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { TaskPanesProps } from "./TaskPaneRouter.tsx";
import { ROUTE_NUM } from "../../../../types/routeNum.ts";

const SelectMention: React.FC<TaskPanesProps> = React.memo(
  ({ title, setRouteNum, formMethods }) => {
    const {} = formMethods;
    return (
      <>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>toをつける相手を選択</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <EditIcon /> ユーザーA
                  </>
                }
              />
            </FormGroup>
          </FormControl>
          <DialogActions>
            <Button
              onClick={() => setRouteNum(ROUTE_NUM.SELECT_ROOM)}
              type="button"
            >
              戻る
            </Button>
            <Button
              onClick={() => setRouteNum(ROUTE_NUM.TASK_DETAIL)}
              type="button"
            >
              次へ
            </Button>
          </DialogActions>
        </DialogContent>
      </>
    );
  },
);

export default SelectMention;
