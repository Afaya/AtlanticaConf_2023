import { IncludedReeResponse } from "./includedReeResponse";
import { ValuesAttributesReeResponse } from "./valuesAttributesReeResponse";

export interface AttributesReeResponse{
              title: string;
              description: string;
              color: string;
              type: string;
              magnitude: string;
              composite: boolean;
              'last-update': Date;
              values: Array<ValuesAttributesReeResponse>;
              content: Array<IncludedReeResponse>;
}