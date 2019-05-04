import * as React from 'react';

import { CaCheckbox, CaInput } from '../Mui';

import './ChipsForm.scss';
import { ChipsFormProps } from './ChipsForm.model';

export class ChipsForm extends React.Component<ChipsFormProps> {
  public constructor(props: ChipsFormProps) {
    super(props);
  }

  public render(): JSX.Element {
    const checkboxes = this.props.technologies.map((technology: any) => (
      <div
        key={technology.key}
        className='chips-form__checkbox'
      >
        <CaCheckbox
          checkedTheme={true}
          key={technology.key}
          label={technology.label}
          isChecked={technology.isChecked}
          onChange={() => {
            this.props.chooseTechnologies(technology);
          }}
        />
      </div>
    ));

    return (
      <form
        className={this.props.isShown ? 'chips-form' : 'hide'}
        style={this.props.technologies.length <= 8 ?
          { overflowY: 'hidden' } :
          { overflowY: 'scroll' }
        }
      >
        <CaInput
          placeholder='Search'
          darkTheme={true}
          id='input-placeholder'
          disableUnderline={true}
          type='text'
        />
        <div className='chips-form__checkboxes'>
          { checkboxes }
        </div>
      </form>
    );
  }
}
