import * as React from 'react';

import { CaTab, CaTable, CaTabs } from 'components';

import {
  JsMarathonCharts,
  MyGameCharts,
  Row,
  RowProperty,
  StatTab,
  TypeOfColumn,
  chartsTypes
} from 'models';

import { I18n } from 'react-i18next';

import { ChartContainer } from '../ChartContainer';

import { StatisticTablesProps, StatisticTablesState } from './StatisticTables.model';

import './StatisticTables.scss';

export class StatisticTables extends React.Component<StatisticTablesProps, StatisticTablesState> {
  constructor(props: StatisticTablesProps) {
    super(props);
    this.state = {
      activeTab: 0,
      rowData: [],
      columnDef: [],
      tableItemName: ''
    };
  }

  public componentWillMount(): void {
    this.changeContent(StatTab.BestUsers);
  }

  public handleRowClick = (item: Row) => {
    switch (this.state.activeTab) {
      case StatTab.TheMostPopularGames:
      case StatTab.RecentGames: {
        this.setState({
          tableItemName: item.game
        });

        break;
      }
      case StatTab.BestUsers: {
        this.setState({
          tableItemName: item.name
        });

        break;
      }
      default: {
        this.setState({
          tableItemName: ''
        });

        break;
      }
    }
  }

  public getChartList = (itemNate: string) => {
    let chartList: string[];

    switch (itemNate) {
      case 'JsMarathon': {
        chartList = [...JsMarathonCharts];

        break;
      }
      case 'MyGame': {
        chartList = [...MyGameCharts];

        break;
      }
      default: {
        chartList = [chartsTypes.NoChartsAvailable];

        break;
      }
    }

    return chartList;
  }

  public showBestUsers = () => {
    this.changeContent(StatTab.BestUsers);
  }
  public showMostPopularGames = () => {
    this.changeContent(StatTab.TheMostPopularGames);
  }
  public showRecentGames = () => {
    this.changeContent(StatTab.RecentGames);
  }

  public render(): JSX.Element {
    return (
      <I18n>
        {
          (t) => (
            <div className='ca-users-tables'>
              <div className='ca-users-tables__statistics'>
                <h2 className='ca-users-tables__statistics-title'>{t('statistics')}</h2>
                <CaTabs value={this.state.activeTab}>
                  <CaTab
                    label={t('bestUsersLabel')}
                    onClick={() => this.changeContent(StatTab.BestUsers)}
                  />
                  <CaTab
                    label={t('mostPopularGamesLabel')}
                    onClick={() => this.changeContent(StatTab.TheMostPopularGames)}
                  />
                  <CaTab
                    label={t('recentGamesLabel')}
                    onClick={() => this.changeContent(StatTab.RecentGames)}
                  />
                </CaTabs>

                <CaTable rowData={this.state.rowData} columnDef={this.state.columnDef} handleRowClick={this.handleRowClick} />
              </div>
              <div className='ca-users-tables__charts'>
                <h2 className='ca-users-tables__charts-title'>{t('charts')}</h2>
                <div className='ca-users-tables__chart-container'>
                  <ChartContainer
                    statistics={this.props.statistic}
                    itemName={this.state.tableItemName}
                    chartList={this.getChartList(this.state.tableItemName)}
                  />
                </div>
              </div>
            </div>
          )
        }
      </I18n>
    );
  }
  
  public changeContent(activeTab: number): void {

    switch (activeTab) {
      case StatTab.BestUsers: {

        const columnDef = [
          {
            headerName: 'userName',
            field: RowProperty.Name,
            type: TypeOfColumn.String
          },
          {
            headerName: 'playedTime',
            field: RowProperty.PlayedTime,
            type: TypeOfColumn.TimeCount
          },
          {
            headerName: 'score',
            field: RowProperty.Scores,
            type: TypeOfColumn.Points
          },
        ];
        const rowData = [...this.props.statistic.bestUsers];

        this.setState({
          activeTab,
          rowData,
          columnDef
        });

        break;
      }

      case StatTab.TheMostPopularGames: {

        const columnDef = [
          {
            headerName: 'game',
            field: RowProperty.Game,
            type: TypeOfColumn.String
          },
          {
            headerName: 'playedInWeek',
            field: RowProperty.PlayedInWeek,
            type: TypeOfColumn.TimeCount
          },
          {
            headerName: 'playedAll',
            field: RowProperty.PlayedTime,
            type: TypeOfColumn.TimeCount
          },
        ];
        const rowData = [...this.props.statistic.mostPopularGames] || [];

        this.setState({
          activeTab,
          rowData,
          columnDef
        });

        break;
      }

      case StatTab.RecentGames: {

        const columnDef = [
          {
            headerName: 'game',
            field: RowProperty.Game,
            type: TypeOfColumn.String
          },
          {
            headerName: 'score',
            field: RowProperty.Scores,
            type: TypeOfColumn.Points
          },
          {
            headerName: 'result',
            field: RowProperty.Result,
            type: TypeOfColumn.Result
          },
        ];
        const rowData = [...this.props.statistic.recentGames] || [];

        this.setState({
          activeTab,
          rowData,
          columnDef
        });

        break;
      }
      default:
        break;
    }
  }
}
