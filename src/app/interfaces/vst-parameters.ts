import { TypeVst } from '@enums/type-vst';
import { Parameter } from './parameter';

export interface VstParameters {
  vstName: string;
  type: TypeVst;
  parts?: string[];
  parameters: Parameter[];
  paramsByPart?: any;
  paramsWthoutPart?: any;
}
