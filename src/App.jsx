import { useState } from 'react'
import './App.css'
import { QRgen } from './component/qrgen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QRgen />
    </>
  )
}

export default App
