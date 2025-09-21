import { useState } from 'react'

const AITogglable = ({ buttonLabel, handleRefinement, handleGenerate }) => {

  const [refineText, setRefineText] = useState('')
  const [generateText, setGenerateText] = useState('')
  const [aiType, setAiType] = useState(0)

  const hideWhenVisable = { display: aiType===0 ? 'none' : '' }
  const showWhenVisable = { display: aiType===1 || aiType===2 ? '' : 'none' }

  const refineVisable = { display: aiType===1 ? '' : 'none' }
  const generateVisable = { display: aiType===2 ? '' : 'none' }

  const closeAI = () => setAiType(0)
  const aiTypeRefine = () => setAiType(1)
  const aiTypeGenerate = () => setAiType(2)

  const generateCall = (event) => {
    event.preventDefault()
    const generateObject = { topic: generateText }
    handleGenerate(generateObject)
    setGenerateText('')
  }

  const refineCall = (event) => {
    event.preventDefault()
    const refineObject = { query: refineText }
    handleRefinement(refineObject)
    setRefineText('')
  }

  return(
    <div>
      <div style={hideWhenVisable}>
        <button onClick = {'instead of this button i want drop down functionality to either call aiTypeRefine or aiTypeGenerate'}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisable}>
        <div style={refineVisable}>
          <form onSubmit={refineCall}>
              <label>refineText
              <input
                value={refineText}
                onChange={event => setRefineText(event.target.value)}
              />
            </label>
            <button type="submit">refine search</button>
          </form>
        </div>
        <div style={generateVisable}>
           <form onSubmit={generateCall}>
              <label>generateText
              <input
                value={generateText}
                onChange={event => setGenerateText(event.target.value)}
              />
            </label>
            <button type="submit">generate searches</button>
          </form>
        </div>
        <button onClick={closeAI}>Close AI Assistant</button>
      </div>
    </div>
  )
}

export default AITogglable