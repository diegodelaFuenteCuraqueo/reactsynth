import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Keyboard from './Keyboard/Keyboard.js'
import Synth from './Synth/Synth.js'
import MIDIInput from './MIDIInput/MIDIInput.js'

//function onMIDIMessage(name) {
//  return function(event) {
//    const [command, note, velocity] = event.data
//    // Log MIDI message data in the console
//    if (command === 254) return
//    console.log(event)
//    console.log(name, 'MIDI Message:', {
//      command,
//      note,
//      velocity,
//      device: name
//    })
//  }
//}

//navigator.requestMIDIAccess().then(midi=>{
//  for(const dev of midi.inputs.values()) {
//    dev.onmidimessage = onMIDIMessage(dev.name)
//    console.log(dev)
//  }
//})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{width:"90%"}}>
          <Synth />
          <Keyboard />
          <MIDIInput />
        </div>
      </header>
    </div>
  );
}

export default App
