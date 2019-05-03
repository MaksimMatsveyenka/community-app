import { createMuiTheme } from '@material-ui/core/styles';

export const CaChipsTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        height: '4rem',
        borderRadius: '0.4rem',
        backgroundColor: '#303644',
        display: 'flex',
        alignItems: 'center',
        padding: '0.6rem 1.6rem',
        boxSizing: 'border-box',
      },
    },

    MuiChip: {
      root: {
        height: '2.8rem',
        backgroundColor: '#BFC3CE',
        padding: '0 0.4rem',

        '&:not(:first-child)': {
          marginLeft: '0.8rem',
        }
      },

      label: {
        fontFamily: 'Source Sans Pro',
        lineHeight: '1.8rem',
        fontSize: '1.4rem',
        color: '#303644',
        padding: 0,
      },

      deleteIcon: {
        margin: '0 1.2rem 0 -0.4rem',
      },
    }
  }
});
