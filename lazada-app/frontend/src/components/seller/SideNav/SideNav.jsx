import React, { useState } from 'react';
import Icon from '../Icons/Icon';
import SideNavLinks from '../SideNavLinks';
import styles from './SideNav.module.css';
import { useNavigate } from 'react-router-dom'

const SideNav = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigation = useNavigate()

    const handleLogout = async () => {
        if (!isLoggingOut) {
            setIsLoggingOut(true);

            try {
                // Remove the "auth" token from local storage
                localStorage.removeItem("auth");
                navigation('/seller/sign-in')
                // You can perform other logout actions here if needed

                console.log('Logged out successfully');
            } catch (error) {
                console.error('An error occurred while logging out', error);
            } finally {
                setIsLoggingOut(false);
            }
        }
    };

    return (
        <aside className={styles.sideNav}>
            <div className={styles.image}></div>
            <SideNavLinks />
            <button onClick={handleLogout}>
                <Icon classes={styles.arrow} />
            </button>
        </aside>
    );
};

export default SideNav;
