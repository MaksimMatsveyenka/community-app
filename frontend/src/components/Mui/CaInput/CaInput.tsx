import * as React from 'react';

import Input, {InputProps} from '@material-ui/core/Input';
import { styles } from './CaInput.styles';
import { createStyled } from 'utils';
import './CaInput.scss';

const Styled = createStyled(styles);

interface InputTheme extends InputProps {
  darkTheme?: boolean;
}

export function CaInput(props: InputTheme): JSX.Element {
  return (
    <Styled>{({ classes }) => (
      <Input
        id={props.id}
        style={ props.darkTheme ? {background: '#252934'} : undefined}
        className={classes.input}
        disableUnderline={props.disableUnderline}
        type={props.type}
        placeholder={props.placeholder}
      />
    )}</Styled>
  );
}
