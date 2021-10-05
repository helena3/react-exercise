import './App.css';
import { Container } from '@mui/material';
import Preview from './components/Preview';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Detail from './components/Detail';

function App() {
  return (
    <Router>
      <Container>
        <Route path='/' exact component={Preview} />
        <Route path='/detail/:id' exact component={Detail} />
      </Container>
    </Router>
  );
}

export default App;
