import Head from 'next/head'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import ReactAudioPlayer from 'react-audio-player';
import Toast from 'light-toast';
import { useHotkeys } from 'react-hotkeys-hook';

export default function Test2() {
  let rap = useRef(null);
  let songs = ["bensound-buddy.mp3", "bensound-dubstep.mp3", "bensound-happyrock.mp3"]
  const [state, setState] = useState(false)
  const [song, setSong] = useState(songs[1])
  let toastDuration = 350

  useHotkeys('p', async () => {
    if (!state) {
      setState(true);
      return await rap.current.audioEl.current.play();
    } else if (state) {
      setState(false);
      return rap.current.audioEl.current.pause();
    }
    return;
  });

  useHotkeys('space', () => {
    setState(false);
    return rap.current.audioEl.current.pause();
  })

  useHotkeys('[', async () => {
    rap.current.audioEl.current.src = songs[0]
    await rap.current.audioEl.current.play()
    setSong(songs[0])
  })

  useHotkeys(']', async () => {
    rap.current.audioEl.current.src = songs[2]
    await rap.current.audioEl.current.play()
    setSong(songs[2])
  })

  useHotkeys('i', () => {
    if (rap.current.audioEl.current.volume <= 1 && rap.current.audioEl.current.volume > 0.2) {
      console.log(rap.current.audioEl.current.volume)

      rap.current.audioEl.current.volume <= 0.3 ? Toast.fail('Min volume', toastDuration) : Toast.info('Volume down', toastDuration)
      rap.current.audioEl.current.volume = rap.current.audioEl.current.volume - 0.2
      Toast.hide()
    }
  })

  useHotkeys('o', () => {
    if (rap.current.audioEl.current.volume <= 1 && rap.current.audioEl.current.volume >= 0) {
      console.log(rap.current.audioEl.current.volume)
      rap.current.audioEl.current.volume > 0.7 ? Toast.fail('Max volume', toastDuration) : Toast.info('Volume up', toastDuration)
      if (rap.current.audioEl.current.volume != 1) rap.current.audioEl.current.volume = rap.current.audioEl.current.volume + 0.2
      Toast.hide()
    }
  })
  // hotkeys(38, function(){
  // })

  return (
    <Centered>
      <p>{song}</p>
      <ReactAudioPlayer
        src={songs[1]}
        controls
        ref={rap}
        id='player'
      />
    </Centered>
  )
}

const Centered = styled.div` 
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`