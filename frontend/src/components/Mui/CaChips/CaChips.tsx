import * as React from 'react';

import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { ChipsForm } from 'components';
import { CaChipsTheme } from './CaChips.theme';
import { CaChipsState } from './CaChips.model';

import './CaChips.scss';

export class CaChips extends React.Component<any, CaChipsState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isFormShown: false,
      chips: [],
    };

    this.clearChips = this.clearChips.bind(this);
    this.showChipsForm = this.showChipsForm.bind(this);
    this.chooseTechnologies = this.chooseTechnologies.bind(this);
  }

  public showChipsForm(): void {
    this.setState(prevState => ({
      isFormShown: !prevState.isFormShown
    }));
  }

  public clearChips(): void {
    this.setState({chips: []});
  }

  public chooseTechnologies(value: any, isChecked: boolean): void {
    const technologies: any[] = this.state.chips;

    if (isChecked) {
      const isExist = technologies.some(item => item.label === value.label);
      !isExist ? technologies.push(value) : null;
    } else {
      const index = technologies.indexOf(value);
      technologies.splice(index, 1);
    }

    this.setState({ chips: technologies });
  }

  public render(): JSX.Element {
    const handleDelete = (chipsItem: any) => () => {
      const chipsArray = this.state.chips;
      const chipToDelete = chipsArray.indexOf(chipsItem);
      chipsArray.splice(chipToDelete, 1);
      this.setState({ chips: chipsArray });
    };

    return (
      <MuiThemeProvider theme={CaChipsTheme}>
        <section className='chips'>
          <Paper onClick={this.showChipsForm}>
            {this.state.chips.map((chipsItem: any) => {
              return (
                <Chip
                  key={chipsItem.key}
                  label={chipsItem.label}
                  onDelete={handleDelete(chipsItem)}
                />
              );
            })}
            <label className='chips__placeholder'>|Select a tag</label>
            <button className='chips__delete-btn' onClick={this.clearChips} />
          </Paper>
          <ChipsForm
            getTechnologies={this.chooseTechnologies}
            isShown={this.state.isFormShown}
          />
        </section>
      </MuiThemeProvider>
    );
  }
}
