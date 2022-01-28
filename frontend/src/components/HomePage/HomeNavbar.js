// import React from "react";
// import { Button, Container, Nav, Image, Navbar } from "react-bootstrap";
// import { 
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link 
// } from 'react-router-dom';

// const HomeNavbar = () => {
//   return (
//     <>
//       <Navbar bg="light" variant="light">
//         <Container>
//         <Navbar.Brand to="/">BERRYFIT</Navbar.Brand>
//         <Nav classNameName="me-auto">
//           <Nav.Link to="/">Home</Nav.Link>
//           <Nav.Link to="/recipe">recipe</Nav.Link>
//           <Nav.Link to="/diet">diet</Nav.Link>
//           <Nav.Link to="/groupmeeting">groupmeeting</Nav.Link>
//         </Nav>
//         </Container>
//       </Navbar>
//     </>
//   );
// };

// export default HomeNavbar;

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
const HomeNavbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">BERRYFIT</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink 
                            className="nav-link" 
                            to="/" 
                            activeClassName="active"
                        >
                                Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            className="nav-link"
                            to="/recipe"
                            activeClassName="active"
                        >
                                Recipe
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            className="nav-link" 
                            to="/diet"
                            activeClassName="active"
                        >
                            Diet
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            className="nav-link" 
                            to="/groupmeeting"
                            activeClassName="active"    
                        >
                            Groupmeeting
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default HomeNavbar;