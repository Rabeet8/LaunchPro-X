import BigNumber from "bignumber.js";
import React,{useState} from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { LinkContainer } from "react-router-bootstrap";
import "../../App.css";
import { useApplicationContext } from "../../context/applicationContext";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import * as s from "../../styles/global";
import { Web3Status } from "../Web3Status";
import Loader from "../Loader";
import { useWeb3React } from "@web3-react/core";
import { CURRENCY } from "../../assets/images";
import { Paper } from "@mui/material";
import { Sidebar, Menu, MenuItem, useProSidebar,SubMenu } from "react-pro-sidebar";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import logo from './logoUrl';
// import {logo} from "../../assets/2.png"
// import {Sidebar} from "./sidebar"

import { FaHome, FaRocket, FaLock, FaUser, FaLayerGroup ,FaCog} from 'react-icons/fa';








const NetworkCard = styled(Paper)`
  display: flex;
  justify-content: center;
  padding: 0 0.75rem 0 0.5rem;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-right: 0.4rem;
  align-items: center;
  justify-content: center;

  & > img,
  span {
    height: ${({ size }) => (size ? size + "px" : "24px")};
    width: ${({ size }) => (size ? size + "px" : "24px")};
  }
`;

const Navigation = () => {
  const {
    domainSettings: { isLockerEnabled, logoUrl },
    isAdmin,
    chainName,
    networkExplorer,
    baseCurrencySymbol,
    ETHamount,
    isNativeCoinBalanceFetching,
    FeeTokenAddress,
    FeeTokenamount,
    FeeTokenSymbol,
    isFeeTokenDataFetching,
  } = useApplicationContext();

  const { chainId } = useWeb3React();

  const [collapsed, setCollapsed] = useState(true);
  const { setToggled } = useProSidebar();

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
    setToggled(!collapsed);
  };

  const mockCompanyLogo =  logo ;

  const hasFeeToken =
    !isFeeTokenDataFetching && FeeTokenSymbol && FeeTokenAddress;

  const getNetworkInfo = () => {
    if (!chainId) return null;

    const networkImage = CURRENCY[chainId];

    return (
      chainName && (
        // TODO: make some wrapped card
        <NetworkCard elevation={2} title={`${chainName} network`}>
          {!!networkImage && (
            <IconWrapper size={20}>
              <img src={networkImage} alt="network logo" />
            </IconWrapper>
          )}
          {chainName}
        </NetworkCard>
      )
    );
  };

  

  return (
    <div className="main-navbar">
      <Navbar expand="lg" variant="dark" style={{ margin: 15 }}>
  <Container style={{ maxWidth: "100%" }}>
  <s.LogoTitle  src={logoUrl || mockCompanyLogo} />
    <div className="d-flex align-items-center justify-content-between w-100">
      <h5 style={{ fontWeight: 'bold', marginLeft: '10px' }}>LaunchPro X</h5>
      <div className="d-flex align-items-center">
        <div className="mr-3">
          {getNetworkInfo()}
        </div>
        <div className="d-flex align-items-center">
          {!hasFeeToken && !isNativeCoinBalanceFetching && (
            <span style={{ color: "#31a6a6", fontWeight: "bold", marginRight: '15px' }}>
              {`$${baseCurrencySymbol} ` +
                BigNumber(ETHamount)
                  .dividedBy(10 ** 18)
                  .toFormat(2)}
            </span>
          )}
          {hasFeeToken && !isNativeCoinBalanceFetching && (
            <NavDropdown
              title={
                <span style={{ color: "#31a6a6", fontWeight: "bold", marginRight: '15px' }}>
                  {`$${baseCurrencySymbol} ` +
                    BigNumber(ETHamount)
                      .dividedBy(10 ** 18)
                      .toFormat(2)}
                </span>
              }
              id="collasible-nav-dropdown"
            >
              <Nav.Link
                style={{ color: "#31a6a6" }}
                href={`${networkExplorer}/address/${FeeTokenAddress}`}
                target="_blank"
              >
                {isFeeTokenDataFetching ? (
                  <Loader />
                ) : (
                  `$${FeeTokenSymbol} ` +
                  BigNumber(FeeTokenamount)
                    .dividedBy(10 ** 18)
                    .toFormat(0)
                )}
              </Nav.Link>
            </NavDropdown>
          )}
          <Web3Status />
        </div>
      </div>
    </div>
  </Container>
</Navbar>

 
      <div className="sub-navbar" style={{ width: '50px', position: 'absolute', top: 100,left: 0 

      
       }}>
   


<div id="app" style={({ height: "70vh" })}>
  
      <Sidebar  width={collapsed ? '50px' : '150px'}  collapsed={collapsed}
        onToggle={handleToggleSidebar}  style={{ marginLeft:'0.5rem' , height: "120vh" }}>
        <Menu >
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={handleToggleSidebar}
            style={{ textAlign: "center", color: "black", transition: "color 0.3s ease" }}
          >
  

          </MenuItem>
          <LinkContainer to="/home">
          <MenuItem  className="Menu" icon={<FaHome />}>Home</MenuItem>
          </LinkContainer>


          {isLockerEnabled && (
              <div>
          
            <SubMenu className="Menu" label={"Launch"} icon={<FaRocket />} iconExpanded={<ChevronRightIcon />}  >
           
            
            <LinkContainer to="/launchpad"><MenuItem >Available Launchpad</MenuItem></LinkContainer>
        
            <LinkContainer to="/launchpadcreation"><MenuItem >Create Launchpad</MenuItem></LinkContainer>
            <LinkContainer to="/fairlaunch"><MenuItem>Fair Launch</MenuItem></LinkContainer>

      
        </SubMenu>
   
      </div>
            )}
       

            <SubMenu className="Menu" label={"Locker"} icon={<FaLock />} iconExpanded={<ChevronRightIcon />}  >
            <LinkContainer to="/lockercreation"><MenuItem >Create Locker</MenuItem></LinkContainer>
            
            </SubMenu>


            <LinkContainer to="/multisend">
          <MenuItem className="Menu" icon={<FaLayerGroup  />}>Multisend</MenuItem>
          </LinkContainer>
          <LinkContainer to="/account">
          <MenuItem className="Menu" icon={<FaUser/>}>Account</MenuItem>
          </LinkContainer>

          {isAdmin && (
          <LinkContainer to="/manage">

          <MenuItem className="Menu" icon={<FaCog />}>Manage</MenuItem>
          </LinkContainer>

          )}
        </Menu>
      </Sidebar>
     
    </div>
      </div>
    </div>
  );
};
export default Navigation;





{/* <Nav fill defaultActiveKey="/home" className="flex-column">
      <LinkContainer style={{ color: "#933abc",padding: '0px 5px' }} to="/home">
        <Nav.Link><FaHome /> Home</Nav.Link>
      </LinkContainer>


      <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink}>
      <LinkContainer style={{ color: "#933abc",padding: '0px 2px' }} to="/launchpad">
        <Nav.Link><FaRocket /> Launch</Nav.Link>
      </LinkContainer>
      <Dropdown.Menu>
        <Dropdown.Item>
        <LinkContainer style={{ color: "#933abc",padding: '0px 2px' }} to="/launchpadcreation">
        <Nav.Link>CreateLaunchpad</Nav.Link>
      </LinkContainer>

        </Dropdown.Item>
        <Dropdown.Item>
        <LinkContainer style={{ color: "#933abc",padding: '0px 2px' }} to="/fairlaunch">
        <Nav.Link>FairLaunch</Nav.Link>
      </LinkContainer>

        </Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown.Toggle>
     
    </Dropdown>
  

      {isLockerEnabled && (
        
        <Dropdown as={NavItem}>
        <Dropdown.Toggle as={NavLink}>
        <LinkContainer style={{ color: "#933abc",padding: '0px 5px' }} to="/locker">
          <Nav.Link><FaLock /> Locker</Nav.Link>
        </LinkContainer>
        <Dropdown.Menu>
          <Dropdown.Item>
          <LinkContainer style={{ color: "#933abc",padding: '0px 2px' }} to="/lockercreation">
          <Nav.Link>CreateLocker</Nav.Link>
        </LinkContainer>
  
          </Dropdown.Item>
          
        </Dropdown.Menu>
        </Dropdown.Toggle>
       
      </Dropdown>
        
      )}

      <LinkContainer style={{ color: "#933abc",padding: '0px 5px' }} to="/multisend">
        <Nav.Link> Multi Send</Nav.Link>


      </LinkContainer>
      <LinkContainer style={{ color: "#933abc",padding: '0px 5px' }} to="/account">
        <Nav.Link><FaUser /> Account</Nav.Link>
      </LinkContainer>

      {isAdmin && (
        <LinkContainer style={{ color: "#933abc",padding: '0px 5px'  }} to="/manage">
          <Nav.Link><FaCog /> Manage</Nav.Link>
        </LinkContainer>
      )}
    </Nav> 
       */}



{
  /* <LinkContainer to="/home">
<Nav.Link>Home</Nav.Link>
</LinkContainer>
<LinkContainer to="/launchpad">
<Nav.Link>Launchpad</Nav.Link>
</LinkContainer>
{
isLockerEnabled &&
<LinkContainer to="/locker">
  <Nav.Link>Locker</Nav.Link>
</LinkContainer>
}
<LinkContainer to="/account">
<Nav.Link>Account</Nav.Link>
</LinkContainer>
{
isAdmin &&
<LinkContainer to="/manage">
  <Nav.Link>Manage</Nav.Link>
</LinkContainer>
} */
}
