import './App.css';
import Home from './components/Home';
import Theme from './theme/theme';

function App() {
  return (
    <>
      <div className="divTheme">
        <Theme />
      </div>
      <Home />
    </>
  );
}

export default App;
