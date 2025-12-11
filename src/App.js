import React, { useState } from 'react'
import Card from './components/Card'
import Background from './components/Background'

export const App = () => {
  const [musicNumber, setMusicNumber] = useState(0)
  return (
    <div className='container'>
      <Background/>
      <main>
        <Card props={{musicNumber, setMusicNumber}}/>
      </main>
    </div>
  )
}

export default App