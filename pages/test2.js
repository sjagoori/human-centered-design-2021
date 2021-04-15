import { useRef, useState } from 'react'
import styled from 'styled-components'
import ReactAudioPlayer from 'react-audio-player';
import Toast from 'light-toast';
import { useHotkeys } from 'react-hotkeys-hook';
import Link from 'next/link'

export default function Test2() {
  let rap = useRef(null);
  let songs = ["bensound-buddy.mp3", "bensound-dubstep.mp3", "bensound-happyrock.mp3"]
  const [state, setState] = useState(false)
  const [song, setSong] = useState(songs[1])
  let toastDuration = 500

  useHotkeys('p', async () => {
    if (!state) {
      Toast.success('Paused', toastDuration)
      setState(true);
      Toast.hide()
      return await rap.current.audioEl.current.play();
    } else if (state) {
      setState(false);
      return rap.current.audioEl.current.pause();
    }
    return;
  });

  useHotkeys('space', () => {
    Toast.success('Paused', toastDuration)
    setState(false);
    Toast.hide()
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
    if (rap.current.audioEl.current.volume <= 1 && rap.current.audioEl.current.volume >= 0.2) {
      console.log(rap.current.audioEl.current.volume)

      rap.current.audioEl.current.volume <= 0.1 ? Toast.fail(`Min volume (${(rap.current.audioEl.current.volume.toFixed(2) * 100) + '%'})`, toastDuration) : Toast.info(`Volume down (${(rap.current.audioEl.current.volume.toFixed(2) * 100) + '%'})`, toastDuration)
      rap.current.audioEl.current.volume = rap.current.audioEl.current.volume - 0.2
      Toast.hide()
    }
  })

  useHotkeys('o', () => {
    if (rap.current.audioEl.current.volume <= 1 && rap.current.audioEl.current.volume >= 0) {
      console.log(rap.current.audioEl.current.volume)
      rap.current.audioEl.current.volume > 0.9 ? Toast.fail(`Max volume (${(Math.round(rap.current.audioEl.current.volume) * 100) + '%'})`, toastDuration) : Toast.info(`Volume (${(Math.round(rap.current.audioEl.current.volume) * 100) + '%'})`, toastDuration)
      if (rap.current.audioEl.current.volume != 1) rap.current.audioEl.current.volume = rap.current.audioEl.current.volume + 0.2
      Toast.hide()
    }
  })
  // hotkeys(38, function(){
  // })

  return (
    <Centered>
      <Link href="/">⇦ Back</Link>
      <p>♫ {song} ♫</p>
      <ReactAudioPlayer
        src={songs[1]}
        controls
        ref={rap}
        id='player'
      />
      <div>
        <p><kbd>p</kbd> - play</p>
        <p><kbd>space</kbd> - pause</p>
        <p><kbd>]</kbd> - next song</p>
        <p><kbd>[</kbd> - previous song</p>
        <p><kbd>i</kbd> - volume down</p>
        <p><kbd>o</kbd> - volume up</p>
      </div>
    </Centered>
  )
}

const Centered = styled.div` 
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;

  kbd {
    background-color: #eee;
    border-radius: 3px;
    border: 1px solid #b4b4b4;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2), 0 2px 0 0 rgba(255, 255, 255, .7) inset;
    color: #333;
    display: inline-block;
    font-size: .85em;
    font-weight: 700;
    line-height: 1;
    padding: 2px 4px;
    white-space: nowrap;
    }

    a{
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 0;
      max-width: 300px;
      padding: 5px 10px;
      border-radius: 5px;
      margin-bottom: 100px;
      border: 1px solid black;
    }
`