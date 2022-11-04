import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function AppBar() {
  return (
    <Navbar bg="dark" variant="dark" id="nav-height">
      <Container fluid className="justify-content-center">
        <h1 className="text-light">Dungeon & Gragons</h1>
      </Container>
    </Navbar>
  );
}

export default AppBar;
