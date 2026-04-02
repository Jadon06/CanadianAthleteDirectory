import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import { FaUserFriends, FaSearch } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { IoIosHome, IoIosNotifications } from "react-icons/io";
import { LuMessageSquareMore } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdNotificationsNone } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";

interface CustomNavBarProps {
    handleClickHome : () => void;
    handleClickMsgs : () => void;
    handleClickNotifications : () => void;
    handleClickDashboard : () => void;
    handleClickSearch : React.KeyboardEventHandler<HTMLInputElement>;
    handleChangeSearch : React.ChangeEventHandler<HTMLInputElement>;
}

function CustomNavBar({handleClickHome, handleClickSearch, handleClickNotifications, handleClickMsgs, handleChangeSearch, handleClickDashboard} : CustomNavBarProps) {
  return (
    <Navbar className="justify-content-center"
        style={{width: "auto", backgroundColor: "white", 
        alignItems: "flex-start", borderBottom: "1px solid black", marginBottom: "20px"}} sticky='top'>
      <Form className='navbar-form'>
        <img 
          src="Logo.png"
          style={{height: "80px", width: "80px", cursor: "pointer", marginRight: "10px",marginLeft: "10px", border: "1px solid black"}}
        />
      </Form>
      <div className="d-flex flex-row" style={{alignItems: "flex-start", marginTop: "10px"}}>
      <Form className='navbar-form' style={{marginTop: "15px"}}>
        <a onClick={handleClickHome} style={{cursor: "pointer"}} className='navbar-brand'>CanadianAthleteDirectory</a>
      </Form>
      <Form style={{marginTop: "12px"}}>
        <InputGroup style={{width: "300px", height: "40px"}}>
            <InputGroup.Text style={{border: "1px solid black"}}>
                <FaSearch />
            </InputGroup.Text>
            <Form.Control 
                placeholder='Search'
                style={{width:"240px", border: "1px solid black"}}
                onKeyDown={handleClickSearch}
                onChange={handleChangeSearch}
            />
        </InputGroup>
      </Form>
      </div>
      <div className="d-flex flex-row" style={{marginLeft: "10px", alignItems: "flex-start", marginTop: "10px"}}>
        <Form style={{marginRight: "10px"}}>
          <div style={{textAlign: "center"}}>
              <MdOutlineHome onClick={handleClickHome} className='icons-settings' style={{display: "block", margin: "0 auto", }}/>
              <Form.Text onClick={handleClickHome} style={{fontSize: "10px", display: "block", cursor: "pointer"}}>Home</Form.Text>
          </div>
        </Form>
        <Form className='d-flex flex-column align-items-center text-center' style={{marginRight: "10px"}}>
          <div style={{textAlign: "center"}}>
              <MdNotificationsNone onClick={handleClickNotifications} className='icons-settings' style={{display: "block", margin: "0 auto"}}/>
              <Form.Text onClick={handleClickNotifications} style={{fontSize: "10px", display: "block", cursor: "pointer" }}>Notifications</Form.Text>
          </div>
        </Form>
        <Form className='d-flex flex-column align-items-center text-center' style={{marginRight: "10px"}}>
          <div style={{textAlign: "center"}}>
              <LuMessageSquareMore onClick={handleClickMsgs} className='icons-settings' style={{display: "block", margin: "0 auto"}}/>
              <Form.Text onClick={handleClickMsgs} style={{fontSize: "10px", display: "block", cursor: "pointer" }}>Messages</Form.Text>
          </div>
        </Form>
        <Form className='d-flex flex-column align-items-center text-center' style={{marginRight: "10px"}}>
          <div style={{textAlign: "center"}}>
              <CgProfile onClick={handleClickDashboard} className='icons-settings' style={{display: "block", margin: "0 auto"}}/>
              <Form.Text onClick={handleClickDashboard} style={{fontSize: "10px", display: "block", cursor: "pointer"}}>Profile</Form.Text>
          </div>
        </Form>
      </div>
    </Navbar>
  );
}

export default CustomNavBar;