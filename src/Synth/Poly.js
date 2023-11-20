
function* generateVoiceObjects(numberOfVoices) {
  for (let i = 0; i < numberOfVoices; i++) {
    yield {
      voice: i+1,
      note: 0,
      velocity: 0,
      active: false,
      noteOn: function (note, velocity) {
        this.note = note
        this.velocity = velocity
        this.active = true
        return this
      },
      noteOff: function () {
        this.velocity = 0
        this.active = false
        return this
      }
    }
  }
}

const numberOfVoices = 8
const voices = [...generateVoiceObjects(numberOfVoices)]

const findVoiceIndexByNote = (note) => voices.findIndex(voice => voice.note === note)

const findFreeVoiceIndex = () => voices.findIndex(voice => !voice.active)

const muteAll = () => voices.forEach(voice => voice.noteOff())

const validateVoiceRequest = (note, velocity) => {
  const findNote = findVoiceIndexByNote(note)
  if (findNote === -1 || voices[findNote].velocity === 0) { // ninguna voz tiene esa nota
    const freeVoiceIndex = findFreeVoiceIndex()
    if (freeVoiceIndex !== -1) {
      return voices[freeVoiceIndex].noteOn(note, velocity)
    } // TODO: implementar voice-stealing
  } else { // una voz tiene esa nota
    return voices[findNote].noteOff()
  }
}

const requestVoice = (note, velocity) => {
  return validateVoiceRequest(note, velocity)
}

export default { requestVoice, muteAll }
