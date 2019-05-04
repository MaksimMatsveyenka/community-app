import * as React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-i18next';

import {
  AuthStatus,
  LoadStatus
} from 'models';

import {
  AppState
} from 'store';

import addToCalendarBtn from './EventPage.style';
import './EventPage.scss';
import {
  EventProps,
} from './Event.model';

import { CaButton, CaLocSelect } from 'components';

import { Dispatch } from 'redux';
import { LoadEvent } from 'store/events';
import { Redirect } from 'react-router';

import iconShare from 'assets/svg/icon-share.svg';
import iconBookmark from 'assets/svg/icon-bookmark--solid.svg';
import calendarGreen from 'assets/svg/icon-calendar--green.svg';
import location from 'assets/svg/icon-location.svg';
import onlineSvg from 'assets/svg/icon-online.svg';
import offlineSvg from 'assets/svg/icon-offline.svg';

import { changeCommaColor } from '../../utils/changeCommaColor';

export class EventPageComp extends React.Component<EventProps> {
  public componentWillMount(): void {
    if (this.props.authStatus === AuthStatus.NotAuthorized) {
      this.props.history.push('/battles');
    }
  }

  public componentDidMount(): void {
    const { loadEvent, match } = this.props;
    loadEvent(match.params['id']);
  }

  public componentWillReceiveProps(nextProps: EventProps): void {
    const { loadEvent, match } = this.props;
    if (nextProps.match.params['id'] !== match.params['id']) {
      loadEvent(nextProps.match.params['id']);
    }
  }

  public render(): JSX.Element {
    const { events, loadEventStatus } = this.props;
    const str = 'Java, С++, Ruby, Go';
    const skills = changeCommaColor(str);
    const menuValues = ['Register', 'Invite team', 'Invite another user'];

    return (
      <I18n>
        {
          (t) => (
            <React.Fragment>
              {
                loadEventStatus === LoadStatus.Error
                  ? <Redirect to='/events' />
                  : events.map(event => {
                    return (
                      <div key={event.id} className='page'>
                        <div className='header'>
                          <div className='header__content'>
                            <div className='header__path'>
                              <a className='header__path-link' href='#'>Events</a>
                              <span className='separator'>></span>
                            </div>
                            <div className='header__title'>{event.title}</div>
                            {
                              event.isOnlineEvent ?
                                <img src={onlineSvg} alt='' className='header__online-status' />
                                  : <img src={offlineSvg} alt='' className='header__online-status' />
                            }
                          </div>
                          <div className='event-information'>
                            <div className='information-nav'>
                              <div className='widget'>
                                <div className='widget__date'>
                                  <img src={ calendarGreen } alt='' />
                                  <div className='number'>
                                    { event.begginingDate }
                                    <span className='separator'>/</span>
                                    { event.begginingInTime }
                                  </div>
                                </div>
                                <div className='widget__city'>
                                  <img src={ location } alt='' />
                                  <div className='title-city'>
                                    { event.city }
                                  </div>
                                </div>
                                <div className='widget__skills'>{ skills }</div>
                              </div>
                              <div className='information__share'>
                                <CaButton style={ addToCalendarBtn }>
                                  {t('Add to my calendar')}
                                </CaButton>
                                <CaLocSelect className={'blue-select'} values={ menuValues } placeholder={'Wanna have fun'}/>
                                <img className='information__bookmark-icon' src={ iconBookmark } />
                                <img src={ iconShare } />
                              </div>
                            </div>
                          </div>
                        </div>
                        <footer className='footer'>
                          <div className='footer__container'>
                            <CaButton className='footer__edit-btn'>
                              <img src='' className='footer__edit-btn-icon' alt=''/>
                              {t('Edit event')}
                            </CaButton>
                          </div>
                        </footer>
                      </div>
                    );
                  }
                  )}
            </React.Fragment>
          )
        }
      </I18n>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadEvent: (id: number) => dispatch(new LoadEvent(id)),
});

const mapStateToProps = (state: AppState) => ({
  authStatus: state.auth.status,
  events: state.events.events,
  loadEventStatus: state.events.loadEventStatus,
});

export const EventPage = connect(mapStateToProps, mapDispatchToProps)(EventPageComp);
