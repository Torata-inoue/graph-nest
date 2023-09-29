import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { ROUTE_NUM } from "../../../../types/routeNum.ts";
import { TaskPanesProps } from "./TaskPaneRouter.tsx";
import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "../../../../queries/chatworkQueries.ts";
import { RoomType } from "../../../../types/chatwork.ts";
import Loading from "../../Loading.tsx";
import Typography from "@mui/material/Typography";
import { Controller } from "react-hook-form";
import Avatar from "@mui/material/Avatar";

const SelectRoom: React.FC<TaskPanesProps> = React.memo(
  ({ title, formMethods, setRouteNum }) => {
    const { loading, data, error } = useQuery<{ getRooms: RoomType[] }>(
      GET_ROOMS,
    );
    const { control, register, trigger } = formMethods;
    register("roomId", {
      required: { value: true, message: "投稿するルームを選択してください" },
      min: { value: 1, message: "投稿するルームを選択してください" },
    });

    const handleClickNext = async () => {
      const isValid = await trigger("roomId");
      if (!isValid) {
        alert("投稿するルームを選択してください");
        return;
      }
      setRouteNum(ROUTE_NUM.SELECT_MENTION);
    };

    return (
      <>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>投稿するチャットルームを選択</FormLabel>
            {loading && <Loading />}
            {error && <Typography color="red">エラーが発生しました</Typography>}
            {!loading && !error && (
              <Controller
                name="roomId"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    {data?.getRooms.map((room) => (
                      <FormControlLabel
                        key={room.roomId}
                        value={room.roomId}
                        control={<Radio />}
                        label={
                          <Chip
                            avatar={
                              <Avatar alt={room.name} src={room.iconPath} />
                            }
                            label={room.name}
                          />
                        }
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            )}
          </FormControl>
          <DialogActions>
            <Button onClick={() => setRouteNum(ROUTE_NUM.TASK_OR_MESSAGE)}>
              戻る
            </Button>
            <Button onClick={handleClickNext}>次へ</Button>
          </DialogActions>
        </DialogContent>
      </>
    );
  },
);

export default SelectRoom;
