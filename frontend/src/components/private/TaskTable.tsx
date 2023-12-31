import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Task } from "../../types/task.ts";
import EditTask from "./action/EditTasks.tsx";
import DeleteTask from "./action/DeleteTask.tsx";
import { Chip, Stack } from "@mui/material";
import { weeks } from "../../types/settings.ts";
import { useRooms } from "../../hooks/private/getChatRooms.ts";
import Loading from "./Loading.tsx";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const getDueTime = (task: Task): string => {
  if (task.isEveryday) {
    return `毎日 ${task.dueTime}時`;
  }

  if (task.dayOfWeek !== null) {
    const dayOfWeek = weeks.find((date) => date.value === task.dayOfWeek)?.key;
    return `毎週 ${dayOfWeek} ${task.dueTime}時`;
  }

  return `毎月 ${task.date}日 ${task.dueTime}時`;
};

type TaskTableProps = {
  tasks: Task[] | undefined;
  userId: number;
};
const TaskTable: React.FC<TaskTableProps> = ({ tasks, userId }) => {
  const { loading, data, error } = useRooms();
  return (
    <TableContainer component={Paper} sx={{ width: "80%", m: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>タイトル</TableCell>
            <TableCell>チャットルーム</TableCell>
            <TableCell>種別</TableCell>
            <TableCell>実行タイミング</TableCell>
            <TableCell>タスク期限（タスクの場合）</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks?.map(function (task) {
            const room = data?.getRooms?.find(
              (room) => room.roomId === task.roomId,
            );
            return (
              <TableRow
                key={task.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {task.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {loading && <Loading />}
                  {error && (
                    <Typography color="red">エラーが発生しました</Typography>
                  )}
                  {!loading && !error && room !== undefined && (
                    <Chip
                      avatar={<Avatar alt={room.name} src={room.iconPath} />}
                      label={room.name}
                    />
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {task.isTask ? "タスク" : "メッセージ"}
                </TableCell>
                <TableCell component="th" scope="row">
                  {getDueTime(task)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {task.isTask
                    ? `${task.limitDate}日と${task.limitHour}時間後`
                    : ""}
                </TableCell>
                <TableCell align="right">
                  <Stack spacing={2} direction="row" justifyContent="flex-end">
                    <EditTask task={task} userId={userId} />
                    <DeleteTask task={task} userId={userId} />
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
