import { AttributesReeResponse } from "./attributesReeResponse";
import { MetaReeResponse } from "./metaReeResponse";

export interface DataReeResponse {
    type: string;
    id: string;
    attributes: AttributesReeResponse;
    meta: MetaReeResponse;
}