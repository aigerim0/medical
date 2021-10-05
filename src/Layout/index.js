import React from 'react';
import LeftSide from "../components/LeftSide";
import Header from "../components/Header";

const Layout = ({children}) => {
    return (
        <div className='general'>

          <div className='left'>
              <LeftSide/>
          </div>
    <div className='right'>
        <Header/>
        <div className='main'>

            <div className='container'>
                {children}
            </div>
        </div>

       
    </div>
        </div>
    );
};

export default Layout;