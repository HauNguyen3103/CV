import ProductDashboard from '../../components/seller/ProductDashboard/ProductDashboard';
import styles from './Pages.module.css';

const ProductPage = () => {
    return (
        <div>
            <main className={styles.first_container}>
                <ProductDashboard></ProductDashboard>
            </main>
        </div>
    );
};

export default ProductPage;