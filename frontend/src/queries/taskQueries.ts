import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query getTasks($userId: Int!) {
    getTasks(userId: $userId) {
      id
      name
      body
      isTask
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
