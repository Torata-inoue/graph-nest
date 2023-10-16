import { RoomType } from "../../types/chatwork.ts";
import { QueryResult, useQuery } from "@apollo/client";
import { GET_ROOMS } from "../../queries/chatworkQueries.ts";

type UseRoomsType = () => QueryResult<{ getRooms: RoomType[] }>;
export const useRooms: UseRoomsType = () =>
  useQuery<{ getRooms: RoomType[] }>(GET_ROOMS);
