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
import Loading from "../../Loading.tsx";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Controller } from "react-hook-form";
import { useRooms } from "../../../../hooks/private/getChatRooms.ts";

const SelectRoom: React.FC<TaskPanesProps> = React.memo(
  ({ title, formMethods, setRouteNum }) => {
    const { loading, data, error } = useRooms();
    const { setValue, register, trigger, control } = formMethods;
    register("roomId", {
      required: { value: true, message: "投稿するルームを選択してください" },
      min: { value: 1, message: "投稿するルームを選択してください" },
    });

    const handleClickRadio: React.MouseEventHandler<HTMLButtonElement> = (
      event,
    ) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setValue("roomId", parseInt(event.target.value));
    };

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
                render={({ field }) => (
                  <RadioGroup>
                    {data?.getRooms.map((room) => (
                      <FormControlLabel
                        key={room.roomId}
                        value={room.roomId}
                        control={
                          <Radio
                            onClick={handleClickRadio}
                            checked={field.value === room.roomId}
                          />
                        }
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
