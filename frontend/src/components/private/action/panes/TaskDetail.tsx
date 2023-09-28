import React from "react";
import { FormControl, FormLabel } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { TaskPanesProps } from "./TaskPaneRouter.tsx";
import { ROUTE_NUM } from "../../../../types/routeNum.ts";

const TaskDetail: React.FC<TaskPanesProps> = ({
  title,
  setRouteNum,
  formMethods,
}) => {
  const {} = formMethods;
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel>タスクの詳細</FormLabel>
          タスクのタイトル
          <input type="text" />
          メッセージ内容 <textarea name="" id=""></textarea>
        </FormControl>
        <DialogActions>
          <Button onClick={() => setRouteNum(ROUTE_NUM.SELECT_MENTION)}>
            戻る
          </Button>
          <Button onClick={() => setRouteNum(ROUTE_NUM.DUE_TIME)}>次へ</Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default TaskDetail;
