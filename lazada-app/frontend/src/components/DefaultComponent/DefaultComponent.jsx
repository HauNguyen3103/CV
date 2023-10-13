import React from 'react';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';

const DefaultComponent = ({children}) => {
  

    return (
        <div >
            <HeaderComponent></HeaderComponent>
            {children}
            <FooterComponent></FooterComponent>
        </div>
    );
};

export default DefaultComponent;