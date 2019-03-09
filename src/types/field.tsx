export type Field = {
  type: string;
  label: string;
  required: boolean;
  hide?: boolean;
  placeholder?: string;
  default?: any;
  options?: any[];
};

export type Fields = {
  [responseProperty: string]: Field;
};

export default Fields;
