import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Autocomplete, Checkbox, FormControl, FormLabel } from "@mui/material";
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
import TextField from "@mui/material/TextField";

const TO_ALL: MemberType = {
  accountId: -1,
  avatarImageUrl: "",
  chatworkId: "",
  department: "",
  name: "全員(TO ALL)",
  organizationId: 0,
  organizationName: "",
  role: "member",
};
const SelectMention: React.FC<TaskPanesProps> = React.memo(
  ({ title, setRouteNum, formMethods }) => {
    const { control, trigger, register, setValue, getValues } = formMethods;
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
    if (data?.getMembers.length === 0) {
      setRouteNum(ROUTE_NUM.SELECT_ROOM);
      alert("自分が入っていないルームには投稿できません");
      return null;
    }

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
            {!loading && !error && data && (
              <Controller
                name="to"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    value={[TO_ALL, ...data.getMembers].filter((member) =>
                      field.value.includes(member.accountId),
                    )}
                    onChange={(_, newValue) => {
                      if (newValue.includes(TO_ALL)) {
                        setValue(
                          "to",
                          getValues("isTask")
                            ? data.getMembers.map((member) => member.accountId)
                            : [TO_ALL.accountId],
                        );
                        return;
                      }
                      setValue(
                        "to",
                        newValue.map((member) => member.accountId),
                      );
                    }}
                    options={[TO_ALL, ...data.getMembers]}
                    disableCloseOnSelect
                    getOptionLabel={(member) => member.name}
                    getOptionDisabled={(member) =>
                      member.accountId !== TO_ALL.accountId &&
                      field.value.includes(TO_ALL.accountId)
                    }
                    renderOption={(props, member, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {member.avatarImageUrl && (
                          <Avatar
                            src={member.avatarImageUrl}
                            alt={member.name}
                            sx={{ width: 24, height: 24, mr: 1 }}
                          />
                        )}
                        {member.name}
                      </li>
                    )}
                    sx={{ width: 500, mt: 2 }}
                    renderInput={(params) => (
                      <TextField {...params} label="toをつける相手を選択" />
                    )}
                  />
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
