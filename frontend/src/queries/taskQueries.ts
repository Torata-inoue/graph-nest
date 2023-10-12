import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query getTasks($userId: Int!) {
    getTasks(userId: $userId) {
      id
      name
      body
      userId
      isTask
      to
      dueTime
      isEveryday
      dayOfWeek
      date
      roomId
      limitDate
      limitHour
      createdAt
      updatedAt
    }
  }
`;
