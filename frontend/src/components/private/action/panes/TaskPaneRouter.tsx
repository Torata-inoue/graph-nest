import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import TaskOrMessage from "./TaskOrMessage.tsx";
import SelectRoom from "./SelectRoom.tsx";
import SelectMention from "./SelectMention.tsx";
import TaskDetail from "./TaskDetail.tsx";
import DueTime from "./DueTime.tsx";
import { TaskInputType } from "../../../../hooks/private/useAddTask.ts";
import { ROUTE_NUM } from "../../../../types/routeNum.ts";
import { Breakpoint } from "@mui/material";

export type TaskPanesProps = {
  title: string;
  setRouteNum: (num: number) => void;
  formMethods: UseFormReturn<TaskInputType>;
};
type TaskPaneRouterProps = {
  defaultRouteNum?: number;
  useFormMethods: UseFormReturn<TaskInputType>;
  title: string;
  setDialogWidth: (width: Breakpoint) => void;
};
const TaskPaneRouter: React.FC<TaskPaneRouterProps> = ({
  defaultRouteNum = ROUTE_NUM.TASK_OR_MESSAGE,
  useFormMethods,
  title,
  setDialogWidth,
}) => {
  const [routeNum, setRouteNum] = useState(defaultRouteNum);
  useEffect(() => {
    if (routeNum === ROUTE_NUM.TASK_DETAIL) {
      setDialogWidth("lg");
    } else {
      setDialogWidth("sm");
    }
  }, [routeNum, setDialogWidth]);
  if (routeNum === ROUTE_NUM.TASK_OR_MESSAGE) {
    return (
      <TaskOrMessage
        title={title}
        setRouteNum={setRouteNum}
        formMethods={useFormMethods}
      />
    );
  }
  if (routeNum === ROUTE_NUM.SELECT_ROOM) {
    return (
      <SelectRoom
        title={title}
        setRouteNum={setRouteNum}
        formMethods={useFormMethods}
      />
    );
  }
  if (routeNum === ROUTE_NUM.SELECT_MENTION) {
    return (
      <SelectMention
        title={title}
        setRouteNum={setRouteNum}
        formMethods={useFormMethods}
      />
    );
  }
  if (routeNum === ROUTE_NUM.TASK_DETAIL) {
    return (
      <TaskDetail
        title={title}
        setRouteNum={setRouteNum}
        formMethods={useFormMethods}
      />
    );
  }
  return (
    <DueTime
      title={title}
      setRouteNum={setRouteNum}
      formMethods={useFormMethods}
    />
  );
};

export default TaskPaneRouter;
