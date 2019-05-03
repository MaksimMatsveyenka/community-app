import { CheckboxProps } from '@material-ui/core/Checkbox';

export interface CaCheckboxProps extends CheckboxProps {
  label: string;
  error?: boolean;
  isChecked: boolean;
  onChange(isChecked: any): void;
}
