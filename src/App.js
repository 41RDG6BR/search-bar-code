import './custom.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      console.log(response.data)
      setUsers(response.data)
    }
    loadUsers()
  }, [])

  const onSuggestHandler = text => {
    setText(text)
  }

  const onChangeHandler= text => {
    let matches = []
    if (text.length > 0) {
      matches = users.filter(user => {
        const regex = new RegExp(`${text}`, "gi")
        return user.email.match(regex)
      })
    }
    console.log(matches, 'matche')
    setSuggestions(matches)
    setText(text)
  }

  return (
    <div className="App">
      <input type="text"
        onChange={(e => onChangeHandler(e.target.value))}
        value={text}
        onBlur={() => {
          setSuggestions([])
        }}
      />
      {suggestions && suggestions.map((suggestion, i) =>
        <div
          key={i}
          className="suggestion"
          onClick={() => onSuggestHandler(suggestion.email)}
        >
          {suggestion.email}
        </div>
      )}
    </div>
  );
}

export default App;
