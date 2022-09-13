
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link, Outlet } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';
import firebaseConfig from './config/firebaseConfig'

function App() {
  const auth = getAuth(firebaseConfig)
  const [user] = useAuthState(auth)
  return (
    <div className="App">
          <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="#home">Wishd</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    
                  </Nav>
                  {user && <Nav className="ms-auto">
                    <Nav.Link onClick={() => signOut(auth) }>Logout</Nav.Link>
                    </Nav>}
                </Navbar.Collapse>
              </Container>
          </Navbar>
      
      <div className="container">
      <Outlet />
      </div>
    </div>
  );
}

export default App;
