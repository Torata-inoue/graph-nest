import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { TaskPanesProps } from "./TaskPaneRouter.tsx";
import { ROUTE_NUM } from "../../../../types/routeNum.ts";
import { useQuery } from "@apollo/client";
import { MemberType } from "../../../../types/chatwork.ts";
import { Controller, useWatch } from "react-hook-form";
import Loading from "../../Loading.tsx";
import Typography from "@mui/material/Typography";
import { GET_MEMBERS } from "../../../../queries/chatworkQueries.ts";
import Avatar from "@mui/material/Avatar";

const SelectMention: React.FC<TaskPanesProps> = React.memo(
  ({ title, setRouteNum, formMethods }) => {
    const { control } = formMethods;
    const roomId = useWatch({ control, name: "roomId" });
    const { loading, data, error } = useQuery<{ getMembers: MemberType[] }>(
      GET_MEMBERS,
      {
        variables: { roomId },
      },
    );
    return (
      <>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>toをつける相手を選択</FormLabel>
            {loading && <Loading />}
            {error && <Typography color="red">エラーが発生しました</Typography>}
            {!loading && !error && (
              <Controller
                name="to"
                control={control}
                render={({ field }) => (
                  <FormGroup {...field}>
                    <FormControlLabel
                      value={0}
                      control={<Checkbox />}
                      label="To ALL"
                    />
                    {data?.getMembers.map((member) => (
                      <FormControlLabel
                        value={member.accountId}
                        control={<Checkbox />}
                        label={
                          <Avatar
                            alt={member.name}
                            src={member.avatarImageUrl}
                          />
                        }
                      />
                    ))}
                  </FormGroup>
                )}
              />
            )}
          </FormControl>
          <DialogActions>
            <Button onClick={() => setRouteNum(ROUTE_NUM.SELECT_ROOM)}>
              戻る
            </Button>
            <Button onClick={() => setRouteNum(ROUTE_NUM.TASK_DETAIL)}>
              次へ
            </Button>
          </DialogActions>
        </DialogContent>
      </>
    );
  },
);

export default SelectMention;
