import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  query {
    getRooms {
      roomId
      name
      type
      role
      sticky
      unreadNum
      mentionNum
      mytaskNum
      messageNum
      fileNum
      taskNum
      iconPath
      lastUpdateTime
    }
  }
`;

export const GET_MEMBERS = gql`
  query getMembers($roomId: Int!) {
    getMembers(roomId: $roomId) {
      accountId
      role
      name
      chatworkId
      organizationId
      organizationName
      department
      avatarImageUrl
    }
  }
`;
