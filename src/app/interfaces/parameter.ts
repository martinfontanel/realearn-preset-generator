import { ParameterCategory } from './parameter-category';

export interface Parameter {
  name: string;
  type?: string;
  category?: string;
  part?: string;
  id?: number;
}
