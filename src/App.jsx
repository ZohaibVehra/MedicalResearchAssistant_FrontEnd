import { useState, useEffect } from "react"
import SearchBar from "../components/searchBar"
import searchesService from '../services/searches'
import Notification from "../components/Notification"
import Togglable from '../components/Togglable'
import LoginForm from '../components/LoginForm'
import loginService from '../services/login'
import PriorSearchesDisplay from "../components/PriorSearches"
import AIToggle from '../components/AIToggle'
import aiService from '../services/ai'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [results, setResults] = useState(null)
  const [user, setUser] = useState(null)
  const [priorSearches, setPriorSearches] = useState({ count: 0, searches: [] })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedMSAUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      searchesService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (!user?.token) return
    (async () => {
      try {
        const data = await searchesService.findMine() 
        setPriorSearches(data)
      } catch (e) {
        setErrorMessage(`Could not load your prior searches, ${e}`)
        setTimeout(() => setErrorMessage(null), 3000)
      }
    })()
  }, [user])

  const handleSearch = async queryObject => {
    try{
      const searchResult = await searchesService.create(queryObject)
      setResults(searchResult)
      const data = await searchesService.findMine()
      setPriorSearches(data)
      console.log('abc', priorSearches)
      
    }catch{
      setErrorMessage(
          'Error performing search, please try again later'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
    }
  }

  const logout = () => {
    setUser(null)
    searchesService.setToken('')
    setPriorSearches({ count: 0, searches: [] });
    window.localStorage.removeItem('loggedMSAUser')
  }

  const handleLogin = async (loginObject) => {
    try{
      const user = await loginService.login(loginObject)

      window.localStorage.setItem(
        'loggedMSAUser', JSON.stringify(user)
      )
      searchesService.setToken(user.token)
      setUser(user)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => {
    return(
      <Togglable buttonLabel="login">
        <LoginForm
          loginUser={handleLogin}
        />
      </Togglable>
    )
  }

  const deletePriorSearch = async search => {
    try{
      await searchesService.deleteSearch(search.id)
      const newPriors = {...priorSearches}
      newPriors.searches = newPriors.searches.filter(s => s.id !== search.id )
      setPriorSearches(newPriors)  
    }catch{
      setErrorMessage('Failed to delete, try again later')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }
  
  const handleRefinement = async ({ query }) => {
    const suggestions = await aiService.rephrase(query)
    console.log('refined',suggestions)
    //if (suggestions[0]) handleSearch({ rawQuery: suggestions[0] })
  }

  const handleGenerate = async ({ topic }) => {
    const suggestions = await aiService.generateFromTopic(topic)
    console.log('gen',suggestions)
    
    //if (suggestions[0]) handleSearch({ rawQuery: suggestions[0] })
  }

  return (
    <>
      <div className='p-4 space-y-4'>
        <AIToggle
          buttonLabel='ai assistant'
          handleRefinement={handleRefinement}
          handleGenerate={handleGenerate}
        />
        {results && <div className='mt-4'>render results here</div>}
      </div>
      <h1>hi</h1>
      {results ? <h5>{results.latest[0].title}</h5> : <h5>nothing</h5>}
      <Notification message={errorMessage} />
      <div className="sideBar">
        {!user &&  loginForm()}
        {user && <button onClick={logout}> logout </button>}
        {user && <PriorSearchesDisplay priorSearches={priorSearches} handleDelete={deletePriorSearch} />}
      </div>
      <SearchBar handleSearch={handleSearch} />
    </>
  )
}

export default App
