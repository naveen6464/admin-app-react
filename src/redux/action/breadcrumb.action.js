import { BREAD_CRUMP } from "../types/breadcrumb.types";

export const breadCrumbAction = (data) => ({
  type: BREAD_CRUMP,
  payload: data,
});
