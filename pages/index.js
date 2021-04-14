import Head from 'next/head'
import { useRef } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import Block from 'components/block/Block.js'
import ReactAudioPlayer from 'react-audio-player';


export default function Home() {
  let rap = useRef(null);
  let isPlaying;

  // Set the drag hook and define component movement based on gesture data
  const [{ x, y, scale }, api] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))
  const bind = useDrag(
    async ({ down, movement: [mx, my], tap }) => {
      api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down, scale: down ? 1.2 : 1 })
      if (my < 80) console.log('up')
      if (my > 80) console.log('down')
      if (my < 80 && (rap.current.audioEl.current.volume <= 0.8 && rap.current.audioEl.current.volume >= 0)) rap.current.audioEl.current.volume = rap.current.audioEl.current.volume + 0.2
      if (my > 80 && (rap.current.audioEl.current.volume <= 1 && rap.current.audioEl.current.volume > 0.2)) rap.current.audioEl.current.volume = rap.current.audioEl.current.volume - 0.2

      console.log(rap.current.audioEl.current.volume)

      if (tap && !isPlaying) {
        await rap.current.audioEl.current.play()
        isPlaying = true
        console.log(tap)

      } else if (tap && isPlaying) {
        rap.current.audioEl.current.pause()
        isPlaying = false
      }

      // if (!rap.current.audioEl.current.play) 

      // console.dir(await rap.current.audioEl.current.play())

      // working
      // rap.current.audioEl.current.volume = 0.2
    },
    { lockDirection: true, filterTaps: true })



  return (
    <Centered>
      <ReactAudioPlayer
        src="George_Gershwin_playing_Rhapsody_in_Blue.ogg"
        controls
        ref={rap}
        id='player'
      // onPlay={(e) => console.log(e)}
      />
      <animated.div {...bind(Block)} style={{ x, y, scale, touchAction: 'none', width: '100px', height: '100px', backgroundColor: 'black', borderRadius: '5px' }} />
    </Centered>
  )
}

const Centered = styled.div`
  display: flex;
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
