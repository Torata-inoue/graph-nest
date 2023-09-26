import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Task} from "../../types/task.ts";
import EditTask from "./action/EditTasks.tsx";
import DeleteTask from "./action/DeleteTask.tsx";
import {Stack} from "@mui/material";

type TaskTableProps = {
  tasks: Task[] | undefined;
  userId: number;
};
const TaskTable: React.FC<TaskTableProps> = ({tasks, userId}) => {
  return (
    <TableContainer component={Paper} sx={{width: '80%', m: 'auto'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Task Name</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks?.map((task) => (
            <TableRow
              key={task.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {task.name}
              </TableCell>
              <TableCell align="right">
                <Stack spacing={2} direction="row" justifyContent="flex-end">
                  <EditTask task={task} userId={userId} />
                  <DeleteTask task={task} userId={userId} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskTable;
