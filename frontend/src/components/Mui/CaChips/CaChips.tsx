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
      technologies: [
        { key: 0, isChecked: false, label: 'Python', },
        { key: 1, isChecked: false, label: 'JavaScript', },
        { key: 2, isChecked: false, label: 'Java', },
        { key: 3, isChecked: false, label: 'C++', },
        { key: 4, isChecked: false, label: 'C#', },
        { key: 5, isChecked: false, label: 'Go', },
        { key: 6, isChecked: false, label: 'Ruby', },
        { key: 7, isChecked: false, label: 'Scala', },
      ],
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
    const prevTechnologies = this.state.technologies;
    prevTechnologies.forEach(item => item.isChecked = false);
    this.setState({chips: [], technologies: prevTechnologies});
  }

  public chooseTechnologies(technology: any): void {
    const prevTechnologies = this.state.technologies;
    const chosenItems = this.state.chips;

    prevTechnologies.forEach(item =>
      item.label === technology.label ?
      item.isChecked = !item.isChecked : null
    );

    if (technology.isChecked) {
      const isExist = chosenItems.some(item => item.label === technology.label);
      !isExist ? chosenItems.push(technology) : null;
    } else {
      const index = chosenItems.indexOf(technology);
      chosenItems.splice(index, 1);
    }

    this.setState({
      technologies: prevTechnologies,
      chips: chosenItems,
    });
  }

  public render(): JSX.Element {
    const handleDelete = (chipsItem: any) => () => {
      const prevChips = this.state.chips;
      const prevTechnologies = this.state.technologies;
      const chipToDelete = prevChips.indexOf(chipsItem);

      const technologyToUnCheck = prevTechnologies.filter(item =>
        item.label === chipsItem.label
      );

      prevTechnologies.forEach(item =>
        item.label === technologyToUnCheck[0].label ?
        item.isChecked = false : null
      );

      prevChips.splice(chipToDelete, 1);
      this.setState({ chips: prevChips });
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
            chooseTechnologies={this.chooseTechnologies}
            technologies={this.state.technologies}
            isShown={this.state.isFormShown}
          />
        </section>
      </MuiThemeProvider>
    );
  }
}
