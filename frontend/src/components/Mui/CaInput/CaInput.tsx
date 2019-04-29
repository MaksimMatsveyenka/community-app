import * as React from 'react';

import Input from '@material-ui/core/Input';
import { styles } from './CaInput.styles';
import { createStyled } from 'utils';
import './CaInput.scss';

const Styled = createStyled(styles);

export function CaInput() {
  return (
    <Styled>{({ classes }) => (
      <Input
        id='input-placeholder'
        className={classes.input}
        disableUnderline={true}
        type='text'
        placeholder='Type technology'
      />
    )}</Styled>
  );
}
