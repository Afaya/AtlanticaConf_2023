import { AttributesReeResponse } from "./attributesReeResponse";

export interface IncludedReeResponse {
    type: string;
    id: string;
    groupId: number;
    attributes: AttributesReeResponse;
}