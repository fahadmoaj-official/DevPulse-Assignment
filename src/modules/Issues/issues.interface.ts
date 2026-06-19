
export type type = "bug" | "feature_request";
export type status = "open" | "in_progress" | "resolved";


export interface Iissues {
  id: number;
  title: string;
  description: string;
  type: type;
  status: status ;
}
