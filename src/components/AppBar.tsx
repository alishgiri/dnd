import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useNavigate, useLocation } from "react-router-dom";

const AppBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" id="nav-height" expand="md">
      <Container>
        <Navbar.Brand className="cursor-pointer" onClick={() => navigate("/")}>
          Dungeon & Dragons
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav activeKey={location.pathname}>
            <Nav.Link eventKey="/spells" onClick={() => navigate("/spells")}>
              Spells
            </Nav.Link>
            <Nav.Link
              eventKey="/favourites"
              onClick={() => navigate("/favourites")}
            >
              Favourites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppBar;
