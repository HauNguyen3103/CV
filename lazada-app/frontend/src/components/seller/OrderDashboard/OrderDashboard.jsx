import { Fragment } from 'react';

import Icon from '../Icons/Icon';

import styles from './OrderDashboard.module.css';
import OrderManagement from '../OrderDashboardContent/OrderManagement';

const OrderDashboard = () => (
    <Fragment>
        <header className="d-flex align-items-center">
            <Icon icon="order" width={20} />
            <h5 className="mb-0 ml-2">Order Management</h5>
        </header>
        <div className={styles.grid}>
            <OrderManagement></OrderManagement>
        </div>
    </Fragment>
);

export default OrderDashboard;
