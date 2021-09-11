import { Grid,Button,Icon } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import VideoCamIcon from '@material-ui/icons/Videocam'
import VideoCamOffIcon from '@material-ui/icons/VideocamOff'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import React, { useState } from 'react'
import { useClient } from './settings';

const Controls = (props) => {
    const {tracks, setStart, setInCall} = props
    const [trackState, setTrackState] = useState({video:true, audio:true});
    const client = useClient();

    const mute = async(type)=>{
        if( type =="audio"){
            await tracks[0].setEnabled(!trackState.audio)
            setTrackState((ps)=>{
                return {...ps, audio:!ps.audio}
            })
        }
        else if( type =="video"){
            await tracks[1].setEnabled(!trackState.audio)
            setTrackState((ps)=>{
                return {...ps, video:!ps.video}
            })
        }
    }

    const leaveChannel = async()=>{
        await client.leave();
        client.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setStart(false);
        setInCall(false);
    }

    return (
       <Grid container spacing={2} alignItems="center">
           <Grid item>
               <Button variant="contained" color={trackState.audio?"primary":"secondary"} onClick={()=>mute("audio")}>
               {trackState.audio?<MicIcon/>:<MicOffIcon/>}
               </Button>
           </Grid>
           <Grid item>
           <Button variant="contained" color={trackState.video?"primary":"secondary"} onClick={()=>mute("video")}>
               {trackState.video?<VideoCamIcon/>:<VideoCamOffIcon/>}
               </Button>
           </Grid>
           <Grid item>
           <Button variant="contained" color="default" onClick={()=>leaveChannel()}>
                Leave <ExitToAppIcon/>
               </Button>
           </Grid>
       </Grid>
    )
}

export default Controls
