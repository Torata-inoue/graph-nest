import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTE_NUM } from "../../../../types/routeNum.ts";
import { TaskPanesProps } from "./TaskPaneRouter.tsx";

const SelectRoom: React.FC<TaskPanesProps> = React.memo(
  ({ title, formMethods, setRouteNum }) => {
    const {} = formMethods;
    return (
      <>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>投稿するチャットルームを選択</FormLabel>
            <RadioGroup name="roomId">
              <FormControlLabel
                value={1}
                control={<Radio />}
                label={
                  <>
                    <EditIcon /> ルームA
                  </>
                }
              />
            </RadioGroup>
          </FormControl>
          <DialogActions>
            <Button
              onClick={() => setRouteNum(ROUTE_NUM.TASK_OR_MESSAGE)}
              type="button"
            >
              戻る
            </Button>
            <Button
              onClick={() => setRouteNum(ROUTE_NUM.SELECT_MENTION)}
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

export default SelectRoom;
