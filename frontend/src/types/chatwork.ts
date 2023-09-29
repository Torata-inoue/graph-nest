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
  accountId: number;
  role: "admin" | "member" | "readonly";
  name: string;
  chatworkId: string;
  organizationId: number;
  organizationName: string;
  department: string;
  avatarImageUrl: string;
};
