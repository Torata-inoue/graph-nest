import React from "react";
import Header from "./Header.tsx";
import TaskTable from "./TaskTable.tsx";
import jwtDecode from "jwt-decode";
import {Payload} from "../types/payload.ts";
import {useQuery} from "@apollo/client";
import {Task} from "../types/task.ts";
import {GET_TASKS} from "../queries/taskQueries.ts";
import Loading from "./Loading.tsx";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import AddTask from "./AddTask.tsx";

const Main: React.FC = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode<Payload>(token!);
  const userId = decodedToken.sub;

  const {loading, data, error} = useQuery<{getTasks: Task[]}>(GET_TASKS, {
    variables: {userId}
  });


  return (
    <>
      <Header />
      <Stack spacing={4} direction="column" m={8} alignItems="center">
        {loading && <Loading/>}
        {error && <Typography color="red">エラーが発生しました</Typography> }
        {!loading && !error && (
          <>
            <AddTask />
            <TaskTable tasks={data?.getTasks} userId={userId} />
          </>
        )}
      </Stack>
    </>
  )
}

export default Main;
