import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import Block from 'components/block/Block.js'
import ReactAudioPlayer from 'react-audio-player';
import Toast from 'light-toast';
import Link from 'next/link'

export default function Home() {
  let rap = useRef(null);
  let direction = useRef(null);
  let isPlaying = false;
  let toastDuration = 350
  let songs = ["bensound-buddy.mp3", "bensound-dubstep.mp3", "bensound-happyrock.mp3"]
  const [song, setSong] = useState(songs[1])
  const [state, setState] = useState(null)
  let songPos = 0;

  // Set the drag hook and define component movement based on gesture data
  const [{ x, y, scale }, api] = useSpring(() => ({ x: 0, y: 0, scale: .8 }))
  const bind = useDrag(
    async ({ dragging, active, movement: [mx, my], tap, cancel }) => {
      if (mx > 50 || mx < -50) cancel()
      if (my > 50 || my < -50) cancel()
      api.start({ x: active ? mx : 0, y: active ? my : 0, immediate: active, scale: active ? 1.2 : .8 })

      if (my < -10 && (rap.current.audioEl.current.volume <= 1 && rap.current.audioEl.current.volume >= 0 && !dragging)) {
        console.log(rap.current.audioEl.current.volume)

        rap.current.audioEl.current.volume > 0.7 ? Toast.fail('Max volume', toastDuration) : Toast.info('Volume up', toastDuration)
        if (rap.current.audioEl.current.volume != 1) rap.current.audioEl.current.volume = rap.current.audioEl.current.volume + 0.2
        Toast.hide()
      }

      if (my > 10 && (rap.current.audioEl.current.volume <= 1 && rap.current.audioEl.current.volume > 0.2) && !dragging) {
        console.log(rap.current.audioEl.current.volume)

        rap.current.audioEl.current.volume <= 0.3 ? Toast.fail('Min volume', toastDuration) : Toast.info('Volume down', toastDuration)
        rap.current.audioEl.current.volume = rap.current.audioEl.current.volume - 0.2
        Toast.hide()
      }


      console.dir(rap.current.audioEl.current)

      if (mx > 10 && !dragging) {
        Toast.info('Skip song', toastDuration)
        rap.current.audioEl.current.src = songs[1]
        // songPos > -1 ? (rap.current.audioEl.current.src = songs[songPos], songPos++) : rap.current.audioEl.current.src = songs[0]
        await rap.current.audioEl.current.play()
        setSong(songs[1])

        isPlaying = true
        setState(true)
      }

      if (mx < -10 && !dragging) {
        Toast.info('Previous song', toastDuration)
        rap.current.audioEl.current.src = songs[0]
        // songPos < songs.length ? (rap.current.audioEl.current.src = songs[songPos], !songPos <= 0 ? songPos-- : null) : rap.current.audioEl.current.src = songs[0]
        await rap.current.audioEl.current.play()
        setSong(songs[0])
        isPlaying = true
        setState(true)
      }

      if (tap && !state) {
        await rap.current.audioEl.current.play()
        isPlaying = true
        setState(true)
        Toast.info('Playing', toastDuration)
        Toast.hide()
      } else if (tap && state) {
        rap.current.audioEl.current.pause()
        isPlaying = false
        setState(false)
        Toast.info('Paused', toastDuration)
        Toast.hide()
      }
    },
    { lockDirection: true, filterTaps: true, threshold: 1 })

    console.log(state)

  // console.log('direction', Toast.info(direction.current, 1000))

  return (
    <Centered>
      <Description>
        <Link href="/">⇦ Back</Link>
        <p><code>tap</code> - play/pause</p>
        <p><code>drag-up</code> - vol-up</p>
        <p><code>drag-down</code> - vol-down</p>
        <p><code>drag-left</code> - previous song</p>
        <p><code>drag-right</code> - next song</p>
      </Description>
      <ReactAudioPlayer
        src={songs[1]}
        // controls
        ref={rap}
        id='player'
      // onPlay={(e) => console.log(e)}
      />
      {state ? <p>♫ {song} ♫</p> : <p></p>}
      <animated.div {...bind(Block)}
        style={{ x, y, scale, touchAction: 'none', width: '150px', height: '150px', border: '.3px solid white', backgroundColor: '#0C3DAB', borderRadius: '50%', boxShadow: 'inset 0 0 50px #fff,inset 20px 0 80px #f0f,inset -20px 0 80px #0ff,inset 20px 0 300px #f0f,inset -20px 0 300px #0ff,0 0 50px #fff,-10px 0 80px #f0f,10px 0 80px #0ff' }}
        onDragEnd={() => {
          console.log('drop')
          console.log(direction)
        }}
      />
    </Centered>
  )
}

const Centered = styled.div` 
  /* background-color: #1a1a1a; */
  
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  margin-top: 20em;
  max-height: 30vh;
  justify-content: space-between;
`

const Description = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 0;
  max-width: 300px;

  >:nth-child(2){
    margin-top: 50px;
  }

  code {
    background-color: #cccccc;
    padding: 5px 10px;
    margin-right: 5px;
    }

    a{
      padding: 5px 10px;
      border-radius: 5px;
      margin-bottom: 100px;
      border: 1px solid black;
    }
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
