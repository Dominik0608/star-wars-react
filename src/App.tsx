import Header from "./components/Header";
import { Container } from "@mui/material";
import PeopleSearch from "./components/PeopleSearch";

function App() {
  return (
    <Container>
      <Header />

      <PeopleSearch />
    </Container>
  );
}

export default App;
