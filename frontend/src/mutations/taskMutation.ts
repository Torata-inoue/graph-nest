import {gql} from "@apollo/client";

export const CREATE_TASK = gql`
mutation createTask($createTaskInput: CreateTaskInput!) {
  createTask(createTaskInput: $createTaskInput) {
    id
    name
    dueDate
    description
    status
  }
}
`
export const UPDATE_TASK = gql`
mutation updateTask($updateTaskInput: UpdateTaskInput!) {
  updateTask(updateTaskInput: $updateTaskInput) {
    id
    name
    status
    dueDate
    description
  }
}
`

export const DELETE_TASK = gql`
mutation deleteTask($deleteTaskInput: DeleteTaskInput!) {
  deleteTask(deleteTaskInput: $deleteTaskInput) {
    id
  }
}
`
