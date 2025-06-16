import { GlobalParameter } from './global-parameter';

export interface ParameterCategory {
	categoryName: string;
	childrenParam?: GlobalParameter[];
	childrenCategories?: ParameterCategory[];
}
