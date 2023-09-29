export type RoomType = {
  roomId: number;
  name: string;
  type: "my" | "direct" | "group";
  role: "admin" | "member" | "readonly";
  sticky: boolean;
  unreadNum: number;
  mentionNum: number;
  mytaskNum: number;
  messageNum: number;
  fileNum: number;
  taskNum: number;
  iconPath: string;
  lastUpdateTime: number;
};

export type MemberType = {
  account_id: number;
  role: "admin" | "member" | "readonly";
  name: string;
  chatwork_id: string;
  organization_id: number;
  organization_name: string;
  department: string;
  avatar_image_url: string;
};
