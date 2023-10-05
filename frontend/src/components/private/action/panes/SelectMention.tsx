import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Checkbox,
  Chip,
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
import { Controller, ControllerRenderProps, useWatch } from "react-hook-form";
import Loading from "../../Loading.tsx";
import Typography from "@mui/material/Typography";
import { GET_MEMBERS } from "../../../../queries/chatworkQueries.ts";
import Avatar from "@mui/material/Avatar";
import { TaskInputType } from "../../../../hooks/private/useAddTask.ts";

const TO_ID = -1;
const SelectMention: React.FC<TaskPanesProps> = React.memo(
  ({ title, setRouteNum, formMethods }) => {
    const { control, trigger, register, setValue } = formMethods;
    const roomId = useWatch({ control, name: "roomId" });
    register("to", {
      required: { value: true, message: "投稿するルームを選択してください" },
    });
    const { loading, data, error } = useQuery<{ getMembers: MemberType[] }>(
      GET_MEMBERS,
      {
        variables: { roomId },
      },
    );

    const handleOnChangeCheck: (
      field: ControllerRenderProps<TaskInputType, "to">,
    ) => (
      event: React.ChangeEvent<HTMLInputElement>,
      checked: boolean,
    ) => void = (field) => (event, checked) => {
      const value = parseInt(event.target.value);
      if (!checked) {
        setValue(
          "to",
          field.value.filter((val) => val !== value),
        );
        return;
      }

      if (value === TO_ID) {
        setValue("to", [TO_ID]);
        return;
      }

      setValue("to", [...field.value, value]);
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
              <Controller
                name="to"
                control={control}
                render={({ field }) => (
                  <FormGroup>
                    <FormControlLabel
                      value={TO_ID}
                      control={
                        <Checkbox
                          onChange={handleOnChangeCheck(field)}
                          checked={field.value.includes(TO_ID)}
                        />
                      }
                      label="To ALL"
                    />
                    {data?.getMembers.map((member) => (
                      <FormControlLabel
                        key={member.accountId}
                        value={member.accountId}
                        control={
                          <Checkbox
                            onChange={handleOnChangeCheck(field)}
                            checked={field.value.includes(member.accountId)}
                            disabled={field.value.includes(TO_ID)}
                          />
                        }
                        label={
                          <Chip
                            avatar={
                              <Avatar
                                alt={member.name}
                                src={member.avatarImageUrl}
                              />
                            }
                            label={member.name}
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
            <Button onClick={handleClickNext}>次へ</Button>
          </DialogActions>
        </DialogContent>
      </>
    );
  },
);

export default SelectMention;
