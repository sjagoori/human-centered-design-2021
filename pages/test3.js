import { useRef, useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import Block from "components/block/Block.js";
import ReactAudioPlayer from "react-audio-player";
import Toast from "light-toast";
import Link from "next/link";
import { useHotkeys } from "react-hotkeys-hook";
import VolumeUp from "assets/svg/VolumeUp";
import VolumeDown from "assets/svg/VolumeDown";
import SkipSong from "assets/svg/SkipSong";
import PrevSong from "assets/svg/PrevSong";

export default function Test3() {
  let rap = useRef(null);
  let direction = useRef(null);
  let toastDuration = 350;
  let songs = [
    "bensound-buddy.mp3",
    "bensound-dubstep.mp3",
    "bensound-happyrock.mp3",
  ];
  const [song, setSong] = useState(songs[1]);
  const [state, setState] = useState(null);

  const [{ x, y, scale }, api] = useSpring(() => ({ x: 0, y: 0, scale: 0.8 }));
  const bind = useDrag(
    async ({ dragging, active, movement: [mx, my], tap, cancel }) => {
      if (mx > 50 || mx < -50) cancel();
      if (my > 50 || my < -50) cancel();
      api.start({
        x: active ? mx : 0,
        y: active ? my : 0,
        immediate: active,
        scale: active ? 1.2 : 0.8,
      });

      if (
        my < -10 &&
        rap.current.audioEl.current.volume <= 1 &&
        rap.current.audioEl.current.volume >= 0 &&
        !dragging
      ) {
        console.log(rap.current.audioEl.current.volume);

        rap.current.audioEl.current.volume > 0.7
          ? Toast.fail("Max volume", toastDuration)
          : Toast.info("Volume up", toastDuration);
        if (rap.current.audioEl.current.volume != 1)
          rap.current.audioEl.current.volume =
            rap.current.audioEl.current.volume + 0.2;
        Toast.hide();
      }

      if (
        my > 10 &&
        rap.current.audioEl.current.volume <= 1 &&
        rap.current.audioEl.current.volume > 0.2 &&
        !dragging
      ) {
        console.log(rap.current.audioEl.current.volume);

        rap.current.audioEl.current.volume <= 0.3
          ? Toast.fail("Min volume", toastDuration)
          : Toast.info("Volume down", toastDuration);
        rap.current.audioEl.current.volume =
          rap.current.audioEl.current.volume - 0.2;
        Toast.hide();
      }

      console.dir(rap.current.audioEl.current);

      if (mx > 10 && !dragging) {
        Toast.info("Skip song", toastDuration);
        rap.current.audioEl.current.src = songs[1];
        // songPos > -1 ? (rap.current.audioEl.current.src = songs[songPos], songPos++) : rap.current.audioEl.current.src = songs[0]
        await rap.current.audioEl.current.play();
        setSong(songs[1]);

        setState(true);
      }

      if (mx < -10 && !dragging) {
        Toast.info("Previous song", toastDuration);
        rap.current.audioEl.current.src = songs[0];
        // songPos < songs.length ? (rap.current.audioEl.current.src = songs[songPos], !songPos <= 0 ? songPos-- : null) : rap.current.audioEl.current.src = songs[0]
        await rap.current.audioEl.current.play();
        setSong(songs[0]);
        setState(true);
      }

      if (tap && !state) {
        await rap.current.audioEl.current.play();
        setState(true);
        Toast.info("Playing", toastDuration);
        Toast.hide();
      } else if (tap && state) {
        rap.current.audioEl.current.pause();
        setState(false);
        Toast.info("Paused", toastDuration);
        Toast.hide();
      }
    },
    { lockDirection: true, filterTaps: true, threshold: 1 }
  );

  useHotkeys("p", async () => {
    if (!state) {
      Toast.success("Paused", toastDuration);
      setState(true);
      Toast.hide();
      return await rap.current.audioEl.current.play();
    } else if (state) {
      setState(false);
      return rap.current.audioEl.current.pause();
    }
    return;
  });

  useHotkeys("space", () => {
    Toast.success("Paused", toastDuration);
    setState(false);
    Toast.hide();
    return rap.current.audioEl.current.pause();
  });

  useHotkeys("[", async () => {
    rap.current.audioEl.current.src = songs[0];
    await rap.current.audioEl.current.play();
    setSong(songs[0]);
  });

  useHotkeys("]", async () => {
    rap.current.audioEl.current.src = songs[2];
    await rap.current.audioEl.current.play();
    setSong(songs[2]);
  });

  useHotkeys("i", () => {
    if (
      rap.current.audioEl.current.volume <= 1 &&
      rap.current.audioEl.current.volume >= 0.2
    ) {
      console.log(rap.current.audioEl.current.volume);

      rap.current.audioEl.current.volume <= 0.1
        ? Toast.fail(
            `Min volume (${
              rap.current.audioEl.current.volume.toFixed(2) * 100 + "%"
            })`,
            toastDuration
          )
        : Toast.info(
            `Volume down (${
              rap.current.audioEl.current.volume.toFixed(2) * 100 + "%"
            })`,
            toastDuration
          );
      rap.current.audioEl.current.volume =
        rap.current.audioEl.current.volume - 0.2;
      Toast.hide();
    }
  });

  useHotkeys("o", () => {
    if (
      rap.current.audioEl.current.volume <= 1 &&
      rap.current.audioEl.current.volume >= 0
    ) {
      console.log(rap.current.audioEl.current.volume);
      rap.current.audioEl.current.volume > 0.9
        ? Toast.fail(
            `Max volume (${
              Math.round(rap.current.audioEl.current.volume) * 100 + "%"
            })`,
            toastDuration
          )
        : Toast.info(
            `Volume (${
              Math.round(rap.current.audioEl.current.volume) * 100 + "%"
            })`,
            toastDuration
          );
      if (rap.current.audioEl.current.volume != 1)
        rap.current.audioEl.current.volume =
          rap.current.audioEl.current.volume + 0.2;
      Toast.hide();
    }
  });

  return (
    <Centered>
      <div>
        <Description>
          <Link href="/">⇦ Back</Link>
          <details>
            <summary>Controls</summary>
            <p>
              <code>tap</code> - play/pause
            </p>
            <p>
              <code>drag-up</code> - vol-up
            </p>
            <p>
              <code>drag-down</code> - vol-down
            </p>
            <p>
              <code>drag-left</code> - previous song
            </p>
            <p>
              <code>drag-right</code> - next song
            </p>
            <br />
            <p>
              <kbd>p</kbd> - play
            </p>
            <p>
              <kbd>space</kbd> - pause
            </p>
            <p>
              <kbd>]</kbd> - next song
            </p>
            <p>
              <kbd>[</kbd> - previous song
            </p>
            <p>
              <kbd>i</kbd> - volume down
            </p>
            <p>
              <kbd>o</kbd> - volume up
            </p>
          </details>
        </Description>
        <ReactAudioPlayer
          src={songs[1]}
          // controls
          ref={rap}
          id="player"
          // onPlay={(e) => console.log(e)}
        />

        {state ? <Title>♫ {song} ♫</Title> : <Title></Title>}
        <animated.div
          {...bind(Block)}
          style={{
            x,
            y,
            scale,
            touchAction: "none",
            width: "150px",
            height: "150px",
            border: ".3px solid white",
            backgroundColor: "#0C3DAB",
            borderRadius: "50%",
            boxShadow:
              "inset 0 0 50px #fff,inset 20px 0 80px #f0f,inset -20px 0 80px #0ff,inset 20px 0 300px #f0f,inset -20px 0 300px #0ff,0 0 50px #fff,-10px 0 80px #f0f,10px 0 80px #0ff",
            zIndex: 1,
          }}
          onDragEnd={() => {
            console.log("drop");
            console.log(direction);
          }}
        />
      </div>
      <IconBox>
        <VolumeUp />
        <SkipSong />
        <VolumeDown />
        <PrevSong />
      </IconBox>
    </Centered>
  );
}

const Title = styled.p`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const IconBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: start;
  justify-items: center;

  height: 70vh;
  width: 70vh;

  position: absolute;
  left: 50%;
  top: 55%;
  transform: translateY(-50%);
  transform: translate(-50%, -50%);

  > :nth-child(1) {
    grid-column: 2;
  }

  > :nth-child(2) {
    grid-column: 3;
    grid-row: 2;
  }

  > :nth-child(3) {
    grid-column: 2;
    grid-row: 3;
  }

  > :nth-child(4) {
    grid-column: 1;
    grid-row: 2;
  }
`;

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  margin-top: 20em;
  max-height: 30vh;
  justify-content: space-between;

  > :nth-child(1) {
    z-index: 1;
  }
`;

const Description = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 0;
  max-width: 300px;

  details {
    margin-top: 30px;
  }

  code {
    background-color: #cccccc;
    padding: 5px 10px;
    margin-right: 5px;
  }

  a {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 100px;
    border: 1px solid black;
  }

  kbd {
    background-color: #eee;
    border-radius: 3px;
    border: 1px solid #b4b4b4;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
      0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
    color: #333;
    display: inline-block;
    font-size: 0.85em;
    font-weight: 700;
    line-height: 1;
    padding: 2px 4px;
    white-space: nowrap;
  }
`;
