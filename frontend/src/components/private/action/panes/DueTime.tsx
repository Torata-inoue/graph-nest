import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { FormControl, FormLabel } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { TaskPanesProps } from "./TaskPaneRouter.tsx";
import { ROUTE_NUM } from "../../../../types/routeNum.ts";

const DueTime: React.FC<TaskPanesProps> = ({
  title,
  formMethods,
  setRouteNum,
}) => {
  const {} = formMethods;
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormLabel>実行タイミング</FormLabel>
        <FormControl>
          実行タイミング（毎日？毎週？毎月？の何時？）
          （タスクの場合、タスクの期限は何日と何時間後？）
        </FormControl>
        <DialogActions>
          <Button
            onClick={() => setRouteNum(ROUTE_NUM.TASK_DETAIL)}
            type="button"
          >
            戻る
          </Button>
          <Button onClick={() => setRouteNum(ROUTE_NUM.CONFIRM)} type="button">
            確認する
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default DueTime;
