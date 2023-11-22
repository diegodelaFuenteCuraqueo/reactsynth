
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
      //noteOff: function () {
      //  this.velocity = 0
      //  this.active = false
      //  return this
      //}
      noteOff: async function () {
        await new Promise((resolve) => {
          this.velocity = 0
          setTimeout(() => {
            this.active = false
            resolve()
          }, 200)
        })
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

const validateVoiceRequest = async (note, velocity) => {
  const findNote = findVoiceIndexByNote(note)
  const freeVoiceIndex = findFreeVoiceIndex()
  if (findNote === -1) { // ninguna voz tiene esa nota
    if (freeVoiceIndex !== -1) {
      return voices[freeVoiceIndex].noteOn(note, velocity)
    } // TODO: implementar voice-stealing
  } else if (voices[findNote].velocity === 0) { // una voz lo tiene pero esta inactiva
    voices[findNote].note = 0
    return voices[freeVoiceIndex].noteOn(note, velocity)
  } else { // una voz tiene esa nota y está activa
    return await voices[findNote].noteOff()
  }
}

const requestVoice = async (note, velocity) => {
  return await validateVoiceRequest(note, velocity)
}

window.voices = null
window.voices = () => console.table(voices)

export default { requestVoice, muteAll }
