import React from "react";
import { FormControl, FormLabel } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { TaskPanesProps } from "./TaskPaneRouter.tsx";
import { ROUTE_NUM } from "../../../../types/routeNum.ts";
import InlineTextInput from "../../../inputs/InlineTextInput.tsx";
import MultilineInput from "../../../inputs/MultilineInput.tsx";

const TaskDetail: React.FC<TaskPanesProps> = ({
  title,
  setRouteNum,
  formMethods,
}) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = formMethods;
  const handleClickNext = async () => {
    const isValidName = await trigger("name");
    const isValidBody = await trigger("body");
    if (!isValidName && !isValidBody) {
      alert("タイトル、本文を入力してください");
      return;
    }
    setRouteNum(ROUTE_NUM.DUE_TIME);
  };
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel>タスクの詳細</FormLabel>
          <InlineTextInput
            placeholder="タスクタイトル"
            register={register("name")}
            error={errors.name}
          />
          <FormLabel>メッセージ本文</FormLabel>
          <MultilineInput
            placeholder="メッセージ本文"
            register={register("body")}
            error={errors.body}
          />
        </FormControl>
        <DialogActions>
          <Button onClick={() => setRouteNum(ROUTE_NUM.SELECT_MENTION)}>
            戻る
          </Button>
          <Button onClick={handleClickNext}>次へ</Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default TaskDetail;
