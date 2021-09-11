import React from 'react'
import { useState } from 'react'
import { Button } from '@material-ui/core';
import VideoCall from './VideoCall';

const App = () => {
  const [inCall, setInCall] = useState(false);
  return (
    <div className="App" style={{height:"100%"}}>
      <Button variant="contained" color="primary" onClick={()=>setInCall(true)}>Join Call</Button>
      {inCall? <VideoCall setInCall={setInCall}/>:"Waiting to join call!"}
    </div>
  )
}

export default App
