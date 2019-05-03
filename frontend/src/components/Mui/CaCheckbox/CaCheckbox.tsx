import * as React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import { CaCheckboxProps } from './CaCheckbox.model';
import './CaCheckbox.scss';

export class CaCheckbox extends React.Component<CaCheckboxProps> {
  public state = {
    isChecked: this.props.isChecked,
  };

  public toggleChange = () => {
    this.props.onChange(this.props.label);
  }

  public render(): JSX.Element {
    const { label } = this.props;

    return (
      <div className='ca-checkbox'>
        <FormControlLabel
          control={
            <Checkbox
              onChange={this.toggleChange}
              checked={this.props.isChecked}
              className={this.props.isChecked ? 'checked' : 'unchecked'}
              icon={<CheckBoxOutlineBlankIcon />}
              checkedIcon={<CheckBoxIcon />}
            />
          }
          label={label}
        />
      </div>
    );
  }
}
