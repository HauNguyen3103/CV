import Icon from './../Icons/Icon';
import styles from './SideNavLinks.module.css';

const SideNavLinks = () => {
    const menu = ['product', 'order', 'stats', 'setting'];
    return (
        <div>
            {menu.map((icon, index) => (
                <div className={`${styles.sideNavLinks} px-2 pt-1 pb-2 mb-4`} key={`${index}-${icon}`}>
                    <Icon icon={icon} />
                </div>
            ))}
        </div>
    );
};

export default SideNavLinks;
