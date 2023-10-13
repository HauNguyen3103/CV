import { Fragment } from 'react';
import Icon from '../Icons/Icon';

import ProductApp from '../ProductDashboardContent/ProductApp';

import styles from './ProductDashboard.module.css';

const ProductDashboard = () => (
    <Fragment>
        <header className="d-flex align-items-center">
            <Icon icon="product" width={20} />
            <h5 className="mb-0 ml-2">Product Management</h5>
        </header>
        <div className={styles.grid}>
            <ProductApp></ProductApp>
        </div>
    </Fragment>
);

export default ProductDashboard;
