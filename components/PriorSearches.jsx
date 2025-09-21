const PriorSearchesDisplay = ({ priorSearches, handleDelete }) => {
    if(priorSearches.searches.length > 0){
      let searches = priorSearches.searches      
      return (
      <div>
        <h4>Prior Searches</h4>
        {searches.map(search => 
          <div key={search.id}>
            <span>{search.rawQuery}</span>
            <button onClick={() => handleDelete(search)}>delete</button>
          </div>
        )}
      </div>
    )
    }
    return
  }

export default PriorSearchesDisplay