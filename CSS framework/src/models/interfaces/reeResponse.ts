import { DataReeResponse } from "./dataReeResponse";
import { IncludedReeResponse } from "./includedReeResponse";

export interface ReeResponse {
  data: DataReeResponse;
  included: Array<IncludedReeResponse>;
}