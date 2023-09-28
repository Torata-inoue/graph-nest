import React, {useState} from "react";
import {UseFormReturn} from "react-hook-form";
import TaskOrMessage from "./TaskOrMessage.tsx";
import SelectRoom from "./SelectRoom.tsx";
import SelectMention from "./SelectMention.tsx";
import TaskDetail from "./TaskDetail.tsx";
import DueTime from "./DueTime.tsx";
import Confirm from "./Confirm.tsx";

type TaskPaneRouterProps = {
  defaultRouteNum?: number;
  useFormMethods: UseFormReturn;
};
const TaskPaneRouter: React.FC<TaskPaneRouterProps> = ({defaultRouteNum = 1, useFormMethods}) => {
  const [routeNum, setRouteNum] = useState(defaultRouteNum);
  if (routeNum === 1) {
    return <TaskOrMessage />
  }
  if (routeNum === 2) {
    return <SelectRoom />
  }
  if (routeNum === 3) {
    return <SelectMention />
  }
  if (routeNum === 4) {
    return <TaskDetail />
  }
  if (routeNum === 5) {
    return <DueTime />
  }
  return <Confirm />
}

export default TaskPaneRouter;
