import React from 'react';
import {Link, NavLink} from "react-router-dom";
import './style.css'

const LeftSide = () => {
    return (
      <div className='left-side'>
          <aside className='aside-left'>
              <div>

              </div>
          </aside>
          <aside className='aside'>
<div className='aside-box'>
    <img className='aside__logo' src='https://static2.mos.ru/upload/motilda/version-cac91c10004b78a9c2ac6cdc0156a85c/MIMC-LogoEng-Main-RG.png'/>
    <div className='aside__Links'>
        <NavLink to={'/works'} className='aside__item'> <i className='bx bx-grid-alt'></i> Задачи и работы 3</NavLink>
        <NavLink to={'/projects'} className='aside__item' ><i className='bx bx-grid-alt'></i>Проекты</NavLink>
        <NavLink to={'/calendar'} className='aside__item'> <i className='bx bx-grid-alt'></i>Календарь</NavLink>
        <NavLink to={'/possibilities'} className='aside__item'> <i className='bx bx-grid-alt'></i>Возможности</NavLink>
    </div>
</div>
          </aside>
      </div>

    );
};

export default LeftSide;