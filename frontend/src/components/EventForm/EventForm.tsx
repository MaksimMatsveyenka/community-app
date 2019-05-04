import { FormGroup, TextField } from '@material-ui/core';
import * as React from 'react';

import {
  CaButton,
  CaCheckbox,
  CaDatePickers,
  CaEventDescription,
  CaTimePickers,
} from 'components';

import { frontEndValidationEventRegister } from 'constes';
import { Event, SettingFormType } from 'models';
import { I18n } from 'react-i18next';
import { history, isEmpty } from 'utils';

import { EventFormProps, EventFormState } from './EventForm.model';

import './EventForm.scss';

const MIN_LENGTH_TITLE = 3;
const MAX_LENGTH_TITLE = 50;
const MIN_LENGTH_DESCRIPTION = 10;
const MAX_LENGTH_DESCRIPTION = 250;
const MIN_LENGTH_CITY = 3;
const MAX_LENGTH_CITY = 50;

export class EventForm extends React.Component<EventFormProps, EventFormState> {
  constructor(props: EventFormProps) {
    super(props);
    this.state = {
      ...props.model,
      title: '',
      description: 'Minskkkkkkk',
      city: '',
      begginingInTime: '2019-05-19',
      begginingDate: '00:00',
      isPublicEvent: true,
      checkboxPublic: true,
      checkboxPersonal: false,
      isOnlineEvent: true,
      checkboxOnline: true,
      checkboxOffline: false,
      isTitleValid: false,
      isDescriptionValid: false,
      isCityValid: false,
      isBegginigInTimeValid: false,
      isBegginigIDateValid: false,
      touched: {
        title: false,
        description: false,
        city: false,
        begginingInTime: false,
        begginingDate: false,
        isPublicEvent: false,
        isOnlineEvent: false,
      },
      titleErrors: [],
      descriptionErrors: [],
      cityErrors: [],
      begginingInTimeErrors: [],
      begginingDateErrors: [],
    };
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name as 'title';

    this.setState({ [name]: value } as EventFormState);
  }

  public checkboxChange = (label: string): void => {
    if (label === 'Public') {
      this.setState({
        isPublicEvent: true,
        checkboxPublic: !this.state.checkboxPublic,
        checkboxPersonal: false,
      });
    } else if (label === 'Personal') {
      this.setState({
        isPublicEvent: false,
        checkboxPersonal: !this.state.checkboxPersonal,
        checkboxPublic: false,
      });
    } else if (label === 'Online') {
      this.setState({
        isOnlineEvent: true,
        checkboxOnline: !this.state.checkboxOnline,
        checkboxOffline: false,
      });
    } else if (label === 'Offline') {
      this.setState({
        isOnlineEvent: false,
        checkboxOffline: !this.state.checkboxOffline,
        checkboxOnline: false,
      });
    }
  }

  public isValidate(): boolean {
    let titleErrors: string[] = [];
    let descriptionErrors: string[] = [];
    let cityErrors: string[] = [];
    let begginingInTimeErrors: string[] = [];
    let begginingDateErrors: string[] = [];

    if (!this.state.title) {
      titleErrors.push(frontEndValidationEventRegister.title.required);
    } else {
      titleErrors = this.removeElFromArrByValue(
        titleErrors,
        frontEndValidationEventRegister.title.required
      );
    }

    if (this.state.title.length < MIN_LENGTH_TITLE || this.state.title.length > MAX_LENGTH_TITLE) {
      titleErrors.push(frontEndValidationEventRegister.title.length);
    } else {
      titleErrors = this.removeElFromArrByValue(
        titleErrors,
        frontEndValidationEventRegister.title.length
      );
    }

    if (!this.state.description) {
      descriptionErrors.push(frontEndValidationEventRegister.description.required);
    } else {
      descriptionErrors = this.removeElFromArrByValue(
        descriptionErrors,
        frontEndValidationEventRegister.description.required
      );
    }

    if (this.state.description.length < MIN_LENGTH_DESCRIPTION || this.state.description.length > MAX_LENGTH_DESCRIPTION) {
      descriptionErrors.push(frontEndValidationEventRegister.description.length);
    } else {
      descriptionErrors = this.removeElFromArrByValue(
        descriptionErrors,
        frontEndValidationEventRegister.description.length
      );
    }

    if (!this.state.city) {
      cityErrors.push(frontEndValidationEventRegister.city.required);
    } else {
      cityErrors = this.removeElFromArrByValue(
        cityErrors,
        frontEndValidationEventRegister.city.required
      );
    }

    if (this.state.city.length < MIN_LENGTH_CITY || this.state.city.length > MAX_LENGTH_CITY) {
      cityErrors.push(frontEndValidationEventRegister.city.length);
    } else {
      cityErrors = this.removeElFromArrByValue(
        cityErrors,
        frontEndValidationEventRegister.city.length
      );
    }

    if (!this.state.begginingInTime) {
      begginingInTimeErrors.push(frontEndValidationEventRegister.begginingInTime.length);
    } else {
      begginingInTimeErrors = this.removeElFromArrByValue(
        begginingInTimeErrors,
        frontEndValidationEventRegister.begginingInTime.length
      );
    }

    if (!this.state.begginingDate) {
      begginingDateErrors.push(frontEndValidationEventRegister.begginingDate.length);
    } else {
      begginingDateErrors = this.removeElFromArrByValue(
        begginingDateErrors,
        frontEndValidationEventRegister.begginingDate.length
      );
    }

    this.setState({
      titleErrors,
      descriptionErrors,
      cityErrors,
      begginingInTimeErrors,
      begginingDateErrors,
    });

    if (titleErrors.length <= 0) {
      this.setState({ isTitleValid: true });
    } else {
      this.setState({ isTitleValid: false });
      return false;
    }

    if (descriptionErrors.length <= 0) {
      this.setState({ isDescriptionValid: true });
    } else {
      this.setState({ isDescriptionValid: false });
      return false;
    }

    if (cityErrors.length <= 0) {
      this.setState({ isCityValid: true });
    } else {
      this.setState({ isCityValid: false });
      return false;
    }

    if (begginingInTimeErrors.length <= 0) {
      this.setState({ isBegginigInTimeValid: true });
    } else {
      this.setState({ isBegginigInTimeValid: false });
      return false;
    }

    if (begginingDateErrors.length <= 0) {
      this.setState({ isBegginigIDateValid: true });
    } else {
      this.setState({ isBegginigIDateValid: false });
      return false;
    }

    return true;
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (this.isValidate()) {
      let event: Event = {
        userId: this.props.userId,
        title: this.state.title,
        description: this.state.description,
        city: this.state.city,
        begginingInTime: this.state.begginingInTime,
        begginingDate: this.state.begginingDate,
        isPublicEvent: this.state.isPublicEvent,
        isOnlineEvent: this.state.isOnlineEvent,
      };

      if (this.props.config === SettingFormType.EditEvent) {
        event = Object.assign(event, { id: this.props.id });
      }

      this.props.submit({ event, userId: this.props.userId });
      history.push('/events');
    }
  }

  public handleBlur = (field: string) => (event: React.FormEvent<HTMLElement>) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true
      }
    });
  }

  public render(): JSX.Element {
    const arrayOfInputs = Object.keys(this.props.model);

    return (
      <I18n>
        {
          (t) => (
            <div className='createForm'>
              <div className='createForm__container'>
                <div className='createForm__legend'>Create New Event</div>
                <div className='createForm__items'>
                  <div className='createForm__items-information'>
                    <div className='createForm__items-title'>Event Information</div>
                    <div className='createForm__information-container'>
                    <form
                className='ca-game-form__container'
                onSubmit={this.handleSubmit}
              >
                {arrayOfInputs.map((input: string) => { // keys of received object
                  return (
                    <FormGroup key={input}>
                      <TextField
                        style={{
                          marginTop: '20px'
                        }}
                        id={input}
                        label={input === 'maxWaitingTime' ? input + ' (minutes)' : input}
                        name={input}
                        value={this.state[`${input}`]}
                        onChange={this.handleChange}
                        type={'text'}
                        error={!this.state[`${input}`] && this.state.touched[`${input}`]}
                      />
                      {!isEmpty(this.state[`${input}Errors`]) &&

                        this.state[`${input}Errors`].map((err: string, index: number) => {
                          return (
                            <div className='ca-game-form__error' key={index}>
                              {t(err)}
                            </div>
                          );
                        })}
                    </FormGroup>
                  );
                })}
                <CaDatePickers
                  style={{
                    marginTop: '20px'
                  }}
                  name={'begginingDate'}
                  onChange={this.handleChange}
                  error={!this.state.begginingDate && this.state.touched.begginingDate}
                />
                <CaTimePickers
                  style={{
                    marginTop: '20px'
                  }}
                  name={'begginingInTime'}
                  onChange={this.handleChange}
                  error={!this.state.begginingInTime && this.state.touched.begginingInTime}
                />
                <CaEventDescription />
                <CaCheckbox
                  label={'Public'}
                  onChange={this.checkboxChange}
                  isChecked={this.state.checkboxPublic}
                  // error={!this.state.isPublicEvent && this.state.touched.isPublicEvent}
                />
                <CaCheckbox
                  label={'Personal'}
                  onChange={this.checkboxChange}
                  isChecked={this.state.checkboxPersonal}
                  // error={!this.state.isPublicEvent && this.state.touched.isPublicEvent}
                />
                <CaCheckbox
                  label={'Online'}
                  onChange={this.checkboxChange}
                  isChecked={this.state.checkboxOnline}
                  // error={!this.state.isOnlineEvent && this.state.touched.isOnlineEvent}
                />
                <CaCheckbox
                  label={'Offline'}
                  onChange={this.checkboxChange}
                  isChecked={this.state.checkboxOffline}
                  // error={!this.state.isOnlineEvent && this.state.touched.isOnlineEvent}
                />
                <CaButton
                  color='primary'
                  type='submit'
                  className='ca-game-form__game-btn'
                  disabled={
                    !this.state.title ||
                    //!this.state.description ||
                    !this.state.city ||
                    !this.state.begginingInTime ||
                    !this.state.begginingDate
                  }
                >
                  {this.props.config}
                </CaButton>
              </form>
                    </div>
                  </div>
                  <div className='createForm__items-pictures'>
                    <div className='createForm__items-title'>Event Picture</div>
                    <div className='createForm__picture-container'></div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </I18n>
    );
  }

  private removeElFromArrByValue(arr: string[], value: string): string[] {
    const index = arr.indexOf(value);
    if (index) {
      arr.splice(index, 1);
    }

    return arr;
  }
}
