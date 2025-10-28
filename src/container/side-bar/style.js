/** ********************Import required packages************** */
import styled from "styled-components";

export const LayoutStyled = styled.div`
  .sidebar {
    position: fixed;
    top: 0;
    left: 10px;
    height: 100%;
    width: 15rem;
    // background: #ffffff;
    z-index: 2;
    overflow: hidden;
    transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
  }

  .sidebar-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 3.7rem;
    padding-top: 0.6rem;
    background-color: #ffffff;
    margin-top: 13px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  .menu-image {
    width: 1.2rem;
    height: 54px;
    // filter: invert(1);
  }

  .menu-image:active {
    fill: blue !important;
  }

  .menu-item {
    text-decoration: none;
    color: white;
    width: 100%;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-right: 10px;
    cursor: pointer;
    display: flex;
    padding-left: 1.5rem;
    height: 55px;
  }

  .menu-item > img {
    width: 1.2rem;
    height: 54px;
    // filter: invert(1);
  }

  .menu-item:hover {
    // border-right: 3px solid #00aeff;
    color: white;
    // background: linear-gradient(90deg, #008cff -2.08%, #2285F9 97.92%);
  }

  // .menu-image:hover {
  //   filter: brightness(0) invert(1);
  // }

  .sidebar.close {
    width: 78px;
    overflow: inherit;
    transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
  }

  .active-route {
    // background-color: #004466 !important;
    border-left: 2px solid #2285F9;
  }
  .active-color .link-name{
    color:#2285F9 !important;
  }

  .active-route .link-name {
    color: #2285F9 !important;
    font-weight: 600 !important;
  }

  .sidebar .logo-details {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .sidebar .logo-details i {
    font-size: 30px;
    color: black;
    height: 50px;
    min-width: 78px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }

  .sidebar .logo-details .logo_name {
    font-size: 22px;
    color: black;
    font-weight: 600;
    transition: 0.3s ease;
    transition-delay: 0.1s;
  }

  .sidebar.close .logo-details .logo_name {
    transition-delay: 0s;
    opacity: 0;
    pointer-events: none;
  }

  .sidebar.close.nav-links {
    overflow: visible;
  }

  .sidebar .nav-links {
    height: 88vh;
    padding: 0px 0 150px 0;
    overflow: auto;
  }

  .background-color {
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .sidebar .nav-links::-webkit-scrollbar {
    display: none;
    overflow-y: auto;
  }

  .close .nav-links {
    overflow: visible;
    background: #ffffff;
  }

  .open .nav-links {
    overflow: scroll;
    height: 88vh;
    margin-bottom: 27px;
    background: #ffffff;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .ps {
    overflow: hidden !important;
    overflow-anchor: none;
    -ms-overflow-style: none;
    touch-action: auto;
  }

  .sidebar .nav-links li {
    position: relative;
    list-style: none;
    transition: all 0.35s ease;
    padding-left: 4px;
  }

  .sidebar .nav-links li .iocn-links {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sidebar .nav-links li i {
    height: 50px;
    min-width: 78px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: black;
    cursor: pointer;
    transform: all 0.35s ease;
  }

  .sidebar .nav-links li.showMenu i.arrow {
    transform: rotate(-180deg);
  }

  .sidebar.close .nav-links i.arrow {
    display: none;
  }

  .sidebar .nav-links li a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  /* ===== Handle Submenu while minimized ===== */
  .sidebar .nav-links li a .link-name {
    font-size: 16px;
    font-weight: 400;
    width: 100%;
    padding-left: 1.3rem;
    height: 55px;
    display: flex;
    align-items: center;
    transition: width 0.4s ease-in-out;
    color: #000000;
    font-weight: 500 ;
  }
  .sub-menu-active {
    height: 30px !important;
    color: #2285F9 !important;
    border-left: 2px solid #2285F9 !important;
  }

  .icons-dynamic{
    color:#000000 !important;
    height:unset !important;
    min-width:unset !important;
    font-size:24px !important;
  }


  .sidebar .nav-links li a .link-name-submenu {
    font-size: 16px;
    font-weight: 400;
    width: 100%;
    margin-left: 2rem;
    padding-left: 0.5rem;
    height: 55px;
    display: flex;
    align-items: center;
    transition: width 0.4s ease-in-out;
    color: black;
  }

  .sidebar .nav-links li a .link-name-submenu.minimized {
    padding-left: 2rem !important;
  }
  .active-route > .link-name-submenu {
    color: #2285F9 !important;
  }

  .sidebar .close .nav-links li a .link-name {
    opacity: 0;
    pointer-events: none;
  }

  .sidebar .nav-links li .submenu {
    // padding: 6px 6px 14px 80px;
    /* margin-top: -10px; */
    background-color: #ffffff;
    color: black;
    display: none;
  }

  .sidebar .nav-links li .submenu.minimized {
    background-color: #ffffff;
  }

  .sidebar .nav-links li.showMenu .submenu {
    display: block;
  }

  .sidebar .nav-links li .submenu a {
    color: black;
    font-size: 15px;
    /* padding: 0.5rem 0 0 1rem; */
    white-space: nowrap;
    transition: all 0.35s ease;
  }
  .sub-menu-height {
    height: 45px !important;
  }

  .sidebar.close .nav-links li a .link-name {
    display: none;
  }

  .sidebar.close .nav-links li i .link-name:hover {
    width: inherit;
    display: block;
  }

  .sidebar.close .nav-links li .submenu {
    position: absolute;
    left: 100%;
    top: -10;
    margin-top: 0;
    // padding: 10px 20px;
    border-radius: 0 6px 6px 0;
    display: block;
    opacity: 0;
    pointer-events: none;
    transition: 0s;
    min-width: 14rem;
    line-height: 40px;
    padding-left: 0px;
  }

  .sidebar.close .nav-links li:hover .submenu {
    top: 0;
    opacity: 1;
    pointer-events: auto;
    transition: all 0.35s ease;
    padding-left: 0px;
  }

  .sidebar .nav-links li .submenu .link-name {
    display: none;
  }

  .sidebar.close .nav-links li .submenu .link-name {
    font-size: 16px;
    opacity: 1;
    display: flex;
  }

  .sidebar .nav-links li .submenu .blank {
    opacity: 1;
    pointer-events: auto;
    padding: 3px 20px 6px 16px;
    opacity: 0;
    pointer-events: none;
  }

  .sidebar .nav-links a:hover .submenu .blank {
    top: 50%;
    transition: translateY(-50%);
    background-color: green;
  }

  .Home-section {
    position: relative;
    background-color: #e4e9f7;
    // height: 100vh;
    left: 260px;
    overflow-x:hidden;
    overflow-y:auto;
    width: calc(100% - 260px);
    transition: all 0.5s ease;
  }

  .sidebar.close ~ .Home-section {
    left: 78px;
    width: calc(100% - 78px);
  }

  .Home-section .home-content {
    height: 50px;
    display: flex;
    align-items: center;
    z-index: 10;
  }

  .Home-section .home-content .bx-menu,
  .Home-section .home-content .text {
    color: #11101d;
    font-size: 35px;
  }

  .Home-section .home-content .text {
    font-size: 16px;
    font-weight: 400;
  }

  .Home-section .home-content .bx-menu {
    margin: 0 15px;
    cursor: pointer;
  }

  .scroll-active {
    overflow-y: visible scroll !important;
  }

  .scroll-inactive {
    overflow: visible !important;
  }

  .margin {
    margin-right: 7%;
    cursor: pointer;
  }

  .Home-section {
    position: relative;
    background-color: #F8F9FC;
    height: 100vh;
    left: 15.6rem;
    width: calc(100% - 15.79rem);
    transition: all 0.4s ease-in-out;
  }
  .active-route .icons-dynamic{
    color:#2285F9 !important
  }
  .active-route .link-name{
    color:#2285F9 !important
    font-weight: 500 !important
  }


  .home-content {
    background: #f8f9fc;
    position: sticky;
    top: 0;
    z-index: 1;
    // box-shadow: rgb(149 157 165 / 20%) 0px 1px 7px;
  }

  .menu-icon {
    color: black;
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
  }

  .Home-section .home-content {
    height: 50px;
    display: flex;
    align-items: center;
  }

  .Home-section .home-content .bx-menu,
  .Home-section .home-content .text {
    color: #11101d;
    font-size: 35px;
  }

  .Home-section .home-content .text {
    font-size: 16px;
    font-weight: 400;
  }

  .Home-section .home-content .bx-menu {
    margin: 0 15px;
    cursor: pointer;
  }

  .sidebar.close ~ .Home-section {
    left: 89px;
    width: calc(100% - 89px);
  }
`;
