import './App.css';
import Keyboard from './Keyboard/Keyboard.js';
import Synth from './Synth/Synth.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Synth />
        <Keyboard />
      </header>
    </div>
  );
}

export default App
