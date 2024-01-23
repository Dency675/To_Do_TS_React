export type TaskPropType = {
  tasks: {
    id: number;
    title: string;
    status: "complete" | "incomplete";
  };
};
export type TaskComponentPropType = {
  tasks: TaskPropType["tasks"];
  onclick: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
