import React from "react";
import Header from "./Header.tsx";
import TaskTable from "./TaskTable.tsx";
import jwtDecode from "jwt-decode";
import {Payload} from "../types/payload.ts";
import {useQuery} from "@apollo/client";
import {Task} from "../types/task.ts";
import {GET_TASKS} from "../queries/taskQueries.ts";

const Main: React.FC = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode<Payload>(token!);
  const userId = decodedToken.sub;

  const {loading, data, error} = useQuery<{getTasks: Task[]}>(GET_TASKS, {
    variables: {userId}
  });
  console.log(data);
  return (
    <>
      <Header />
      <TaskTable />
    </>
  )
}

export default Main;
