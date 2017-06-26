/**
 * Created by apple on 16/10/21.
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FinishedChip from '../../src/chip/finished_chip';
import ToggleChip from '../../src/chip/toggle_chip';

//加载Divider
storiesOf('Chip', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .add('FinishedChip', () => (
    <section>
      <FinishedChip/>
      <br/>
      <FinishedChip finished={true}/>
    </section>
  ))
  .add('ToggleChip', () => {
    return <section>
      <ToggleChip value={1}/>
    </section>
  });

