import './refresh-control-section.scss';

import { Action, RefreshControlSectionProps } from './refresh-control-section.model';
import { Button, Container, Title, Typography } from './refresh-control-section.styles';
import { ReactElement, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import LinearProgressBar from '../LinearProgressBar/LinearProgressBar';
import { SelectList } from '../SelectList/SelectList';
import { TimeIntervals } from '@kleeen/types';
import classnames from 'classnames';
import { useKleeenActions } from '@kleeen/react/hooks';

const bem = 'ks-refresh-control';

const AvatarSection = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect id="blue_square" fill="#069" x="0" y="0" width="100%" height="100%" />
    </svg>
  );
};

// Select And Execute
const SelectedStatsSection = (props: { actions: Action[]; time; setTime }) => {
  return (
    <SelectList
      id="select-refresh-time"
      label="Refresh..."
      labelId="refresh-time"
      className={classnames(`${bem}__select`)}
      onChange={(value) => {
        props.setTime(value);
      }}
      options={TimeIntervals}
      value={props.time}
    />
  );
};

export const RefreshControlSection = (props: RefreshControlSectionProps): ReactElement => {
  const [time, setTime] = useState(5);
  const [completed, setCompleted] = useState(1);
  const [title, setTitle] = useState('');
  const [timeCurrent, setTimeCurrent] = useState({ h: '00', m: '00', s: '01' });
  const { refreshPage } = useKleeenActions(props.taskName);

  const handleRefresh = (): void => {
    setCompleted(1);
    setTitle('');
    setTimeCurrent({ h: '00', m: '00', s: '01' });
    refreshPage();
  };

  return (
    <>
      <Container maxWidth="xl" className={classnames(bem, 'refresh-control')}>
        {props.showAvatar && (
          <Grid className={classnames(`${bem}__avatar-container`)} item xs={4} sm={2}>
            <AvatarSection />
          </Grid>
        )}
        <Grid className={classnames(`${bem}__content`, 'main-container')}>
          <Title>
            <Typography variant="h2" component="h1">
              {props.title}
            </Typography>
          </Title>
          <LinearProgressBar
            completed={completed}
            refreshPage={refreshPage}
            setCompleted={setCompleted}
            setTime={setTime}
            setTimeCurrent={setTimeCurrent}
            setTitle={setTitle}
            time={time}
            timeCurrent={timeCurrent}
            title={title}
          />
        </Grid>
        <Grid className={classnames(`${bem}__actions`, 'actions-container')}>
          <SelectedStatsSection actions={props.actions} time={time} setTime={setTime} />
          <Button variant="contained" color="primary" onClick={handleRefresh}>
            {'REFRESH'}
          </Button>
        </Grid>
      </Container>
    </>
  );
};
