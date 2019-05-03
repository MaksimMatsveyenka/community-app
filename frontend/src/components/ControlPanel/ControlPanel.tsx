import * as React from 'react';

import './ControlPanel.scss';

import {
  CaCheckbox,
  CaDatePicker,
  CaLocSelect,
  CaChips,
} from '../../components/Mui';

import { ControlPanelState } from './ControlPanel.model';

export class ControlPanel extends React.Component<any, ControlPanelState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      online: false,
      offline: false,
    };
  }

  public checkOnlineStatus = (label: string): void => {
    if (label === 'Online') {
      this.setState({
        online: !this.state.online,
        offline: false,
      });
    } else if (label === 'Offline') {
      this.setState({
        offline: !this.state.offline,
        online: false,
      });
    }
  }

  public render(): JSX.Element {
    return (
      <section className='ca-control-panel'>
        <div className='ca-control-panel__content'>
          <div className='ca-control-panel__first-row'>
            <div className='ca-control-panel__game-select'>
              <h3 className='ca-control-panel__heading'>Game name (in event)</h3>
              <CaLocSelect values={['1', '2', '3']} placeholder={'Select game'}/>
            </div>
            <div className='ca-control-panel__location-select'>
              <h3 className='ca-control-panel__heading'>Location</h3>
              <CaLocSelect values={['1', '2', '3']} placeholder={'Select a location'}/>
            </div>
            <div className='ca-control-panel__date-range'>
              <h3 className='ca-control-panel__heading'>Date range</h3>
              <div className='ca-control-panel__pickers'>
                <CaDatePicker />
                <span className='ca-control-panel__separator'>-</span>
                <CaDatePicker />
              </div>
            </div>
            <div className='ca-control-panel__event-type'>
              <h3 className='ca-control-panel__heading'>Event type</h3>
              <div className='ca-control-panel__checkbox-container'>
                <CaCheckbox
                  label={'Online'}
                  isChecked={this.state.online}
                  onChange={this.checkOnlineStatus}
                />
                <CaCheckbox
                  label={'Offline'}
                  isChecked={this.state.offline}
                  onChange={this.checkOnlineStatus}
                />
              </div>
            </div>
          </div>
          <div className='ca-control-panel__second-row'>
            <div className='ca-control-panel__technology'>
              <h3 className='ca-control-panel__heading'>Technology</h3>
              <CaChips />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
