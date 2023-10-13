import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { TaskPanesProps } from "./TaskPaneRouter.tsx";
import { ROUTE_NUM } from "../../../../types/routeNum.ts";
import InlineTextInput from "../../../inputs/InlineTextInput.tsx";
import { Controller, UseFormGetValues, UseFormReturn } from "react-hook-form";
import { TaskInputType } from "../../../../hooks/private/useAddTask.ts";
import { weeks } from "../../../../types/settings.ts";
import Typography from "@mui/material/Typography";

type SelectDueProps = {
  type: 1 | 2 | 3 | undefined;
  formMethods: UseFormReturn<TaskInputType>;
};
const SelectDue: React.FC<SelectDueProps> = ({ type, formMethods }) => {
  const {
    register,
    formState: { errors },
    setValue,
    control,
  } = formMethods;

  register("dayOfWeek", {
    required: {
      value: type === 2,
      message: "毎週何曜日に送信するか選択してください",
    },
  });
  const monthRegister = register("date", {
    required: {
      value: type === 3,
      message: "毎月何日に送信するか入力してください",
    },
    valueAsNumber: true,
    min: { value: 1, message: "日付は1~31を入力してください" },
    max: { value: 31, message: "日付は1~31を入力してください" },
  });

  if (type === 1 || type === undefined) {
    return null;
  }

  if (type === 2) {
    const handleClickRadio: React.MouseEventHandler<HTMLButtonElement> = (
      event,
    ) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const value: 0 | 1 | 2 | 3 | 4 | 5 | 6 = parseInt(event.target.value);
      setValue("dayOfWeek", value);
    };
    return (
      <>
        <FormLabel>毎週何曜日？</FormLabel>
        <Controller
          name="dayOfWeek"
          control={control}
          render={({ field }) => (
            <RadioGroup>
              {weeks.map((date) => (
                <FormControlLabel
                  key={date.key}
                  value={date.value}
                  control={
                    <Radio
                      onClick={handleClickRadio}
                      checked={field.value === date.value}
                    />
                  }
                  label={date.key}
                />
              ))}
            </RadioGroup>
          )}
        />
        {errors.dayOfWeek && (
          <Typography color="red">{errors.dayOfWeek.message}</Typography>
        )}
      </>
    );
  }

  return (
    <>
      <FormLabel>毎月何日？</FormLabel>
      <InlineTextInput
        placeholder="何日？"
        error={errors.date}
        type="number"
        register={monthRegister}
      />
    </>
  );
};

const dueTypes = [
  { key: "毎日", value: 1 },
  { key: "毎週", value: 2 },
  { key: "毎月", value: 3 },
];
const getDefaultType = (
  getValues: UseFormGetValues<TaskInputType>,
): 1 | 2 | 3 => {
  if (getValues("dayOfWeek") !== undefined && getValues("dayOfWeek") !== null) {
    return 2;
  }
  if (getValues("date")) {
    return 3;
  }
  return 1;
};
const DueTime: React.FC<TaskPanesProps> = ({
  title,
  formMethods,
  setRouteNum,
}) => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    resetField,
  } = formMethods;
  const [currentType, setCurrentType] = useState<1 | 2 | 3>(
    getDefaultType(getValues),
  );
  const isTask = getValues("isTask");

  const handleClickRadio: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value: 1 | 2 | 3 = parseInt(event.target.value);
    resetField("isEveryday");
    resetField("dayOfWeek");
    resetField("date");
    setValue("isEveryday", value === 1);
    setCurrentType(value);
  };
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <FormLabel>実行タイミング</FormLabel>
          <RadioGroup row>
            {dueTypes.map((type) => (
              <FormControlLabel
                key={type.key}
                value={type.value}
                control={
                  <Radio
                    onClick={handleClickRadio}
                    checked={currentType === type.value}
                  />
                }
                label={type.key}
              />
            ))}
          </RadioGroup>
          <SelectDue type={currentType} formMethods={formMethods} />
          <FormLabel>何時に送信？</FormLabel>
          <InlineTextInput
            placeholder="実行時間(時)"
            error={errors.name}
            type="number"
            register={register("dueTime", {
              valueAsNumber: true,
              required: { value: true, message: "実行時間を入力してください" },
              min: { value: 0, message: "0~24時の間で入力してください" },
              max: { value: 24, message: "0~24時の間で入力してください" },
            })}
          />
          {isTask && (
            <>
              <Divider variant="middle" sx={{ my: 3 }} />
              <FormLabel>タスク期限</FormLabel>
              <InlineTextInput
                placeholder="日後"
                error={errors.limitDate}
                type="number"
                register={register("limitDate", {
                  valueAsNumber: true,
                  required: {
                    value: isTask,
                    message: "期限を入力してください",
                  },
                })}
              />
              <InlineTextInput
                placeholder="時間後"
                error={errors.limitHour}
                type="number"
                register={register("limitHour", {
                  valueAsNumber: true,
                  required: {
                    value: isTask,
                    message: "期限を入力してください",
                  },
                  min: { value: 0, message: "0~24時の間で入力してください" },
                  max: { value: 24, message: "0~24時の間で入力してください" },
                })}
              />
            </>
          )}
        </FormControl>
        <DialogActions>
          <Button onClick={() => setRouteNum(ROUTE_NUM.TASK_DETAIL)}>
            戻る
          </Button>
          <Button type="submit">保存する</Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default DueTime;
