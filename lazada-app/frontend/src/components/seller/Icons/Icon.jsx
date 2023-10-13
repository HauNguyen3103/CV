import PropTypes from 'prop-types';

import { ICON_COLOR } from '../../../shared/constants';

import ArrowIcon from './ArrowIcon';
import ProductIcon from './ProductIcon';
import SettingIcon from './SettingIcon';
import DashboardIcon from './DashboardIcon';
import DowntrendIcon from './DowntrendIcon';
import EyeIcon from './EyeIcon';
import GridIcon from './GridIcon';
import ListIcon from './ListIcon';
import OptionsIcon from './OptionsIcon';
import SearchIcon from './SearchIcon';
import StatsIcon from './StatsIcon';
import OrderIcon from './OrderIcon';
import UsdIcon from './UsdIcon';
import UserIcon from './UserIcon';

const Icon = props => {
    const components = {
        arrow: ArrowIcon,
        product: ProductIcon,
        setting: SettingIcon,
        dashboard: DashboardIcon,
        downtrend: DowntrendIcon,
        eye: EyeIcon,
        grid: GridIcon,
        list: ListIcon,
        options: OptionsIcon,
        search: SearchIcon,
        stats: StatsIcon,
        order: OrderIcon,
        usd: UsdIcon,
        user: UserIcon,
    };

    const IconComponent = components[props.icon];
    return <IconComponent {...props} />;
};

export default Icon;

Icon.propTypes = {
    props: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        color: PropTypes.string,
        width: PropTypes.number,
        classes: PropTypes.string,
    }),
};

Icon.defaultProps = {
    icon: 'arrow',
    color: ICON_COLOR,
};