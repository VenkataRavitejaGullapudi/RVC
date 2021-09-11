import {createClient, createMicrophoneAndCameraTracks} from 'agora-rtc-react'

const appId = "22441ee31b92425fb89f853edc596844"
const token = "00622441ee31b92425fb89f853edc596844IADDvxxJslvnP1H2YHuOzzYe6LxJSraQV6ehN9+jd4/BIGTNKL8AAAAAEADC2ctrLis+YQEAAQAwKz5h"


export const config = {
    mode:"rtc",
    codec:"vp8",
    appId:appId,
    token:token
}

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";