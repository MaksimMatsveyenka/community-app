import * as React from 'react';
import { I18n } from 'react-i18next';

import './EventCard.scss';
import { EventCardProps } from './EventCard.model';
import { NavLink } from 'react-router-dom';
import { changeCommaColor } from '../../utils/changeCommaColor';

import bookmark from 'assets/svg/icon-bookmark--check.svg';
import calendarGreen from 'assets/svg/icon-calendar--green.svg';
import location from 'assets/svg/icon-location.svg';
// import onlineSvg from 'assets/svg/icon-online.svg';
// import offlineSvg from 'assets/svg/icon-offline.svg';

export class CaEventCard extends React.PureComponent<EventCardProps> {
  public render(): JSX.Element {
    const { id, title, city, begginingDate } = this.props;
    const str = 'Java, C++, Ruby, Go';
    const skills = changeCommaColor(str);

    return (
      <I18n>
        {
          t => (
            <NavLink to={`/event/${id}`} >
              <div className='event-card'>
                <div className='event-card__img'>
                  {/* {
                    online ?
                      <img src={onlineSvg} alt='' className='event-card__online-status' />
                        : <img src={offlineSvg} alt='' className='event-card__online-status' />
                  } */}
                  <div className='event-card__bookmark-icon'>
                    <img src={bookmark} alt='' />
                  </div>
                </div>
                <div className='event-card__info'>
                  <div className='event-card__title'>
                    {title}
                  </div>
                  <div className='event-card__date-info'>
                    <img src={calendarGreen} alt='' />
                    <div className='event-card__date'>
                      {begginingDate}
                    </div>
                  </div>
                  <div className='event-card__location-info'>
                    <img src={location} alt='' />
                    <div className='event-card__location'>
                      {city}
                    </div>
                  </div>
                  <div className='event-card__skills'>
                    {skills}
                  </div>
                </div>
              </div>
            </NavLink>
          )
        }
      </I18n>
    );
  }
}
