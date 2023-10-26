import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Autocomplete, FormControl, FormLabel } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { ROUTE_NUM } from "../../../../types/routeNum.ts";
import { TaskPanesProps } from "./TaskPaneRouter.tsx";
import Loading from "../../Loading.tsx";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Controller } from "react-hook-form";
import { useRooms } from "../../../../hooks/private/getChatRooms.ts";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const SelectRoom: React.FC<TaskPanesProps> = React.memo(
  ({ title, formMethods, setRouteNum }) => {
    const { loading, data, error } = useRooms();
    const { setValue, register, trigger, control, resetField } = formMethods;
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
            {!loading && !error && data && (
              <Controller
                control={control}
                name="roomId"
                render={({ field }) => (
                  <Autocomplete
                    value={
                      data.getRooms.find(
                        (room) => room.roomId === field.value,
                      ) || null
                    }
                    onChange={(_, newValue) =>
                      newValue
                        ? setValue("roomId", newValue.roomId)
                        : resetField("roomId")
                    }
                    options={data.getRooms}
                    getOptionLabel={(room) => room.name}
                    renderOption={(props, room) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <Avatar
                          src={room.iconPath}
                          alt={room.name}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        {room.name}
                      </Box>
                    )}
                    sx={{ width: 500, mt: 2 }}
                    renderInput={(params) => (
                      <TextField {...params} label="ルームを選択" />
                    )}
                  />
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
