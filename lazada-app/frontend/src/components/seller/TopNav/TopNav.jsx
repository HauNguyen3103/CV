import React from 'react';
import styles from './TopNav.module.css';


const TopNav = () => {
    const userData = JSON.parse(localStorage.getItem('auth'));

    return (
        <nav className={`${styles.topNav} d-flex justify-content-between align-items-center px-3`}>
            <h5 className={styles.brand}>Welcome, {userData.name} Dashboard</h5>
        </nav>
    );

};

export default TopNav;
