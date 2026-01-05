export type Status =
  | { type: "loading"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | { type: "idle" };