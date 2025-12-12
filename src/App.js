import React, { useState } from 'react'
import Card from './components/Card'
import Background from './components/Background'
import List from './components/List'

export const App = () => {

  const [musicNumber, setMusicNumber] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <>
    <Background/>
    <div className='container'>

      <main>
        <Card props={{musicNumber, setMusicNumber, setOpen}}/>
        <List props={{open, setOpen, musicNumber, setMusicNumber}}/>
      </main>

    </div>
    </>
  )
}

export default App