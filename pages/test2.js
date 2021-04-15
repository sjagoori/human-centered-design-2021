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



// const bind = useDrag(({ down, movement: [mx, my] }) => {
//   set({ x: down ? mx : 0, y: down ? my : 0 },{ lockDirection: true })
//   console.log(down)
//   // console.log(mx, my)

//   // if (my < -80) console.log('going up')
//   // if (mx < -80 && my < -80) console.log('going up-left')
//   // if (mx < -80 && my > 80) console.log('going up-right')

//   // if (my > 80) console.log('going down')
//   // if (my > 80 && mx < -80) console.log('going down-left')
//   // if (my > 80 && mx > 80) console.log('going down-right')

//   // if (mx > 80) console.log('going right')
//   // if (mx < -80) console.log('going left')
// })
