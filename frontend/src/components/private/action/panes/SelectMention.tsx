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
import { useWatch } from "react-hook-form";
import Loading from "../../Loading.tsx";
import Typography from "@mui/material/Typography";
import { GET_MEMBERS } from "../../../../queries/chatworkQueries.ts";
import Avatar from "@mui/material/Avatar";

const TO_ID = -1;
const SelectMention: React.FC<TaskPanesProps> = React.memo(
  ({ title, setRouteNum, formMethods }) => {
    const { control, trigger, register, setValue, getValues } = formMethods;
    const roomId = useWatch({ control, name: "roomId" });
    const to = useWatch({ control, name: "to" });
    register("to", {
      required: { value: true, message: "投稿するルームを選択してください" },
    });
    const { loading, data, error } = useQuery<{ getMembers: MemberType[] }>(
      GET_MEMBERS,
      {
        variables: { roomId },
      },
    );

    const handleClickCheck: React.MouseEventHandler<HTMLButtonElement> = (
      event,
    ) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const value = parseInt(event.target.value);
      const to = getValues("to");

      if (to.some((v) => v === value)) {
        setValue(
          "to",
          to.filter((v) => v !== value),
        );
        return;
      }

      if (value === TO_ID) {
        setValue("to", [TO_ID]);
        return;
      }

      to.push(value);
      setValue("to", to);
    };

    const handleClickNext = async () => {
      const isValid = await trigger("to");
      if (!isValid) {
        alert("toをつける相手を選択してください");
        return;
      }
      setRouteNum(ROUTE_NUM.TASK_DETAIL);
    };
    return (
      <>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>toをつける相手を選択</FormLabel>
            {loading && <Loading />}
            {error && <Typography color="red">エラーが発生しました</Typography>}
            {!loading && !error && (
              <FormGroup>
                <FormControlLabel
                  value={0}
                  control={<Checkbox onClick={handleClickCheck} />}
                  label="To ALL"
                />
                {data?.getMembers.map((member) => (
                  <FormControlLabel
                    key={member.accountId}
                    value={member.accountId}
                    control={
                      <Checkbox
                        onClick={handleClickCheck}
                        disabled={to[0] === TO_ID}
                      />
                    }
                    label={
                      <Avatar alt={member.name} src={member.avatarImageUrl} />
                    }
                  />
                ))}
              </FormGroup>
            )}
          </FormControl>
          <DialogActions>
            <Button onClick={() => setRouteNum(ROUTE_NUM.SELECT_ROOM)}>
              戻る
            </Button>
            <Button onClick={handleClickNext}>次へ</Button>
          </DialogActions>
        </DialogContent>
      </>
    );
  },
);

export default SelectMention;
