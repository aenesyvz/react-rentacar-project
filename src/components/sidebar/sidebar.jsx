import React, { useRef } from 'react'

import "./styles.css"
function Sidebar({user}) {
    const ref = useRef(null);
    const menuRef = useRef(null);
    


    return (
  
        
        <div>
            <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'></link>
            <div className="sidebar"  ref={ref}>
                <div className="logo-details">
                    <i className='bx bxl-c-plus-plus bx-menu' ref={menuRef}></i>
                    <span className="logo_name">RentACar</span>
                </div>
                <ul className="nav-links">
                    <li>
                        <a href="#">
                            <i className='bx bx-grid-alt' ></i>
                            <span className="link_name">Dashboard</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#"></a></li>
                        </ul>
                    </li>
                    <li>
                        <div className="iocn-link">
                            <a href="#">
                                <i className='bx bx-collection' ></i>
                                <span className="link_name">Kullanıcılar</span>
                            </a>
                            <i className='bx bxs-chevron-down arrow' ></i>
                        </div>
                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Category</a></li>
                            <li><a href="#">Bireysel Müşteriler</a></li>
                            <li><a href="#">Kurumsal Müşteriler</a></li>
                            <li><a href="#">Personeller</a></li>
                        </ul>
                    </li>
                    <li>
                        <div className="iocn-link">
                            <a href="#">
                                <i className='bx bx-book-alt' ></i>
                                <span className="link_name">Posts</span>
                            </a>
                            <i className='bx bxs-chevron-down arrow' ></i>
                        </div>
                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Posts</a></li>
                            <li><a href="#">Web Design</a></li>
                            <li><a href="#">Login Form</a></li>
                            <li><a href="#">Card Design</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-pie-chart-alt-2' ></i>
                            <span className="link_name">Analytics</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">Analytics</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-line-chart' ></i>
                            <span className="link_name">Chart</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">Chart</a></li>
                        </ul>
                    </li>
                    <li>
                        <div className="iocn-link">
                            <a href="#">
                                <i className='bx bx-plug' ></i>
                                <span className="link_name">Plugins</span>
                            </a>
                            <i className='bx bxs-chevron-down arrow' ></i>
                        </div>
                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Plugins</a></li>
                            <li><a href="#">UI Face</a></li>
                            <li><a href="#">Pigments</a></li>
                            <li><a href="#">Box Icons</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-compass' ></i>
                            <span className="link_name">Explore</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">Explore</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-history'></i>
                            <span className="link_name">History</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">History</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-cog' ></i>
                            <span className="link_name">Setting</span>
                        </a>
                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">Setting</a></li>
                        </ul>
                    </li>
                    <li>
                        <div className="profile-details">
                            <div className="profile-content">
                                {/* <img src="image/profile.jpg" alt="profileImg"> */}
                            </div>
                            <div className="name-job">
                                <div className="profile_name">{user}</div>
                                <div className="job">Web Desginer</div>
                            </div>
                            <i className='bx bx-log-out' ></i>
                        </div>
                    </li>
                </ul>
            </div>
        {/* <s src='./script.js'> */}
     

        
        </div>
    )
}

export default Sidebar