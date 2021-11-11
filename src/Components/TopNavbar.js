import React from "react";
import {Navbar,Nav,Container, NavDropdown} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../features/userSlice";
import {FiMenu, GrSearch, FaUserCircle,MdBookmark } from "react-icons/all";
import '../styles/navbar.css';
import {useHistory} from "react-router-dom";
import Search from "./Search";

function TopNavbar() {
    const user = useSelector((state => state.user.user))
    const dispatch = useDispatch()
    const history = useHistory()
    return (

        <Navbar collapseOnSelect expand="md" fixed='top' bg="dark" variant="dark" className='the_navbar'>
            <Container>
                <Navbar.Brand href="/" className='nav_tag'>IMDb</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="col-9">
                  <Nav.Link className='menu_button'><FiMenu /> Menu</Nav.Link>
                    <div className='search_bar d-md-flex'>
                          {/*<input*/}
                          {/*  type="text"*/}
                          {/*  placeholder="Search IMDb"*/}
                          {/*  className="flex-grow-1"*/}
                          {/*  aria-label="Search"*/}
                          {/*/>*/}
                        <Search className="flex-grow-1"/>
                     </div>
                </Nav>

                <Nav>
                    <Nav.Item className='nav_item'>IMDbPro</Nav.Item>
                    <Nav.Item className='nav_item'
                              onClick={()=> history.push('/watchlist')}
                    ><MdBookmark className='watchlist' />Watchlist</Nav.Item>
                </Nav>

                <Nav className="ms-auto">
                    {user ? <><FaUserCircle className='user_icon' />
                            <NavDropdown title={user.first_name} id="basic-nav-dropdown">
                              <NavDropdown.Item href="/login"
                                                onClick={() =>{
                                                    dispatch(logout())
                                                    localStorage.clear()
                                                }}
                              >Logout</NavDropdown.Item>
                            </NavDropdown></> :
                        <Nav.Link href="/login" className='sign_in'>Sign in</Nav.Link>
                    }

                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default TopNavbar