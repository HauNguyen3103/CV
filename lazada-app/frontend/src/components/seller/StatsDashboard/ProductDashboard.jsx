import { Fragment } from 'react';

import Icon from '../Icons/Icon';

import styles from './StatsDashboard.module.css';
import StatsMain from '../StatsDashboardContent/StatsMain';

const StatsDashboard = () => (
    <Fragment>
        <header className="d-flex align-items-center">
            <Icon icon="stats" width={20} />
            <h5 className="mb-0 ml-2">Statistic Dashboard</h5>
        </header>
        <div className={styles.grid}>
            <StatsMain></StatsMain>
        </div>
    </Fragment>
);

export default StatsDashboard;
