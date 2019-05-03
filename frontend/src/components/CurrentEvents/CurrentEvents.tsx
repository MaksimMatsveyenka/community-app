import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppState } from 'store';
import { LoadEvents } from 'store/events';
import { AuthStatus } from 'models';

import { CaEventCard } from 'components/EventCard';
import { ControlPanel } from 'components/ControlPanel';

import './CurrentEvents.scss';
import { CurrentEventsProps } from './CurrentEvents.model';

import iconArrowLeft from 'assets/svg/icon-arrow--left.svg';
import iconArrowRight from 'assets/svg/icon-arrow--right.svg';

export class CurrentEvents extends React.Component<CurrentEventsProps> {
  public componentWillMount(): void {
    const isAuthenticated = this.props.authStatus === AuthStatus.Authorized;

    if (!isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  public componentDidMount(): void {
    this.props.loadEvents();
  }

  public render(): JSX.Element {
    const { events } = this.props;

    return (
      <div className='wrapper'>
        <div className='event-accordion'>
          <div className='date-nav'>
            <span className='date-nav__title'>Today</span>
            <div className='date-nav__arrow'>
              <img src={iconArrowLeft} className='date-nav__arrow--margin' />
              <img src={iconArrowRight} />
            </div>
          </div>
          <div className='event-board'>
            {events.slice(0, 3).map(event => {
              return (
                <CaEventCard
                  key={event.id}
                  id={Number(event.id)}
                  title={event.title}
                  city={event.city}
                  place={event.place}
                  begginingInTime={event.begginingInTime}
                  begginingDate={event.begginingDate}
                  isPublicEvent={event.isPublicEvent}
                />
              );
            })}
          </div>
        </div>
        <ControlPanel />
        <div className='event-list'>
          <div className='all-event'>{
            events.map((event: any) => {
              return (
                <CaEventCard
                  key={event.id}
                  id={Number(event.id)}
                  title={event.title}
                  city={event.city}
                  place={event.place}
                  begginingInTime={event.begginingInTime}
                  begginingDate={event.begginingDate}
                  isPublicEvent={event.isPublicEvent}
                />
              );
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  authStatus: state.auth.status,
  events: state.events.events,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadEvents: () => dispatch(new LoadEvents()),
});

export const CaEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentEvents);
