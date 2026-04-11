import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { LuMessageSquareMore } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdNotificationsNone, MdOutlineHome } from "react-icons/md";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiUrl } from '../utils/api';

interface CustomNavBarProps {
    handleClickHome : () => void;
    handleClickMsgs : () => void;
    handleClickNotifications : () => void;
    handleClickDashboard : () => void;
    handleClickSearch : React.KeyboardEventHandler<HTMLInputElement>;
    handleChangeSearch : React.ChangeEventHandler<HTMLInputElement>;
}

interface userData {
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    password: string;
    profile_picture: string;
    phone_number: string;
    school: string;
    position: string;
    height: string;
    weight: string;
    age: string;
    user_type: string;
}

function CustomNavBar({handleClickHome, handleClickSearch, handleClickNotifications, handleClickMsgs, handleChangeSearch, handleClickDashboard} : CustomNavBarProps) {
  const [options, setOptions] = useState<userData[]>([])
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const handleBrandClick = () => {
    if (location.pathname === '/') {
      navigate('/sign-up')
      return
    }
    navigate('/')
  }

  const fetchResults = async() => {
    const response = await fetch(apiUrl('/search/'), {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: inputValue })
    })
    if (!response.ok) {
      const data = await response.json()
      console.log(data)
    }
    else {
      const data = await response.json()
      setOptions(data)
    }
  }

  useEffect(() => {
    fetchResults();
  }, [inputValue])

  return (
    <Navbar className="topbar" sticky='top'>
      <Container fluid className="topbar-inner d-flex align-items-center justify-content-between gap-3 py-2 flex-wrap">
        <div className="brand-mark" onClick={handleBrandClick} style={{ cursor: "pointer" }}>
          <img src="Logo.png" alt="Canadian Athlete Directory" />
          <span>Canadian Athlete Directory</span>
        </div>

        <Form className='navbar-form flex-grow-1' style={{ maxWidth: "520px" }}>
          <InputGroup className="navbar-search">
              <InputGroup.Text className="navbar-search-icon">
                  <FaSearch />
              </InputGroup.Text>
                <Autocomplete<userData, false, false, true>
                  options={options}
                  groupBy={(option) => option.user_type}
                  getOptionLabel={(option) => typeof option === 'string' ? option : `${option.first_name} ${option.last_name}`}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      marginLeft: "-1px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    },
                  }}
                  freeSolo={true}
                  inputValue={inputValue}
                  onInputChange={(_event, newValue) => {
                    setInputValue(newValue);
                    handleChangeSearch({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      size="small"
                      onKeyDown={handleClickSearch}
                    />
                  )}
              />
          </InputGroup>
        </Form>

        <div className="navbar-chip-row">
          <div className="nav-icon-button" onClick={handleClickHome} title="Home" aria-label="Home"><MdOutlineHome /></div>
          <div className="nav-icon-button" onClick={handleClickNotifications} title="Notifications" aria-label="Notifications"><MdNotificationsNone /></div>
          <div className="nav-icon-button" onClick={handleClickMsgs} title="Messages" aria-label="Messages"><LuMessageSquareMore /></div>
          <div className="nav-icon-button" onClick={handleClickDashboard} title="Profile" aria-label="Profile"><CgProfile /></div>
        </div>
      </Container>
    </Navbar>
  );
}

export default CustomNavBar;