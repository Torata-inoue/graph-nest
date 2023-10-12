import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation createTask($createTaskInput: CreateTaskInput!) {
    createTask(createTaskInput: $createTaskInput) {
      id
      name
      body
      isTask
      userId
      to
      dueTime
      isEveryday
      dayOfWeek
      date
      createdAt
      updatedAt
    }
  }
`;
export const UPDATE_TASK = gql`
  mutation updateTask($updateTaskInput: UpdateTaskInput!) {
    updateTask(updateTaskInput: $updateTaskInput) {
      id
      name
      body
      isTask
      userId
      to
      dueTime
      isEveryday
      dayOfWeek
      date
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($deleteTaskInput: DeleteTaskInput!) {
    deleteTask(deleteTaskInput: $deleteTaskInput) {
      id
    }
  }
`;
