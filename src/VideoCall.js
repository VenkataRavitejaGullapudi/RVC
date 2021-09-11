import React from 'react'
import { useState, useEffect } from 'react';
import { channelName, config, useClient, useMicrophoneAndCameraTracks } from './settings'
import { Grid } from '@material-ui/core'
import Controls from './Controls';
import Video from './Video';

const VideoCall = (props) => {
    const { setInCall } = props;
    const [ users, setUsers ] = useState([]);
    const [start, setStart] = useState(false);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    useEffect(() => {
        let init = async (cName) => {
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    setUsers(prevUsers => {
                        return [...prevUsers, user];
                    })
                }
                if (mediaType === "audio") {
                    user.audioTrack.play();
                }
            })

            client.on("user-unpublished", (user, mediaType) => {
                if (mediaType === "audio") {
                    if (user.audioTrack) user.audioTrack.stop();
                }
                if (mediaType === "video") {
                    setUsers(prevUsers => {
                        return prevUsers.filter(u => (u.uid !== user.uid));
                    })
                }
            })

            client.on("user-left", (user) => {
                setUsers(prevUsers => {
                    return prevUsers.filter(u => (u.uid !== user.uid));
                })
            })

            try{
                await client.join(config.appId,cName,config.token,null);
            }catch(err){
                console.log(err);
            }
            if(tracks) await client.publish([tracks[0],tracks[1]]);
            setStart(true);
        }

        if (ready && tracks){
            try{
                init(channelName)
            }
            catch(err){
                console.log(err);
            }
        }
    }, [channelName, client, ready, tracks])
    return (
        <Grid container direction="column" style={{height:"100%"}}>
            <Grid item style ={{height:"5%"}}>
                {ready && tracks && (<Controls tracks={tracks} setStart={setStart} setInCall={setInCall}/>)}
            </Grid>
            <Grid item style ={{height:"95%"}}>
            {ready && tracks && (<Video tracks={tracks} users={users} />)}
            </Grid>
        </Grid>
    )
}

export default VideoCall
