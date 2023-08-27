import React from "react";
import Header from "./Header.tsx";
import TaskTable from "./TaskTable.tsx";

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <TaskTable />
    </>
  )
}

export default Main;
