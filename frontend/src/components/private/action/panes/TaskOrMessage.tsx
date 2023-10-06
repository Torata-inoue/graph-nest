import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ROUTE_NUM } from "../../../../types/routeNum.ts";
import { TaskPanesProps } from "./TaskPaneRouter.tsx";
import { Controller } from "react-hook-form";

const TaskOrMessage: React.FC<TaskPanesProps> = ({
  title,
  setRouteNum,
  formMethods,
}) => {
  const { control, setValue } = formMethods;
  const handelChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event,
  ) => {
    setValue("isTask", event.target.value === "true");
  };
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel>タスク or メッセージ？</FormLabel>
          <Controller
            name="isTask"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <RadioGroup row>
                <FormControlLabel
                  value={true}
                  control={
                    <Radio
                      onChange={handelChange}
                      checked={field.value === true}
                    />
                  }
                  label="タスクを作成"
                />
                <FormControlLabel
                  value={false}
                  control={
                    <Radio
                      onChange={handelChange}
                      checked={field.value === false}
                    />
                  }
                  label="メッセージを作成"
                />
              </RadioGroup>
            )}
          />
        </FormControl>
        <DialogActions>
          <Button onClick={() => setRouteNum(ROUTE_NUM.SELECT_ROOM)}>
            次へ
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default TaskOrMessage;
