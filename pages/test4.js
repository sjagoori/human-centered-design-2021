import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import Block from "components/block/Block.js";
import ReactAudioPlayer from "react-audio-player";
import Toast from "light-toast";
import Link from "next/link";
import { WheelGestures } from "wheel-gestures";
import VolumeUp from "assets/svg/VolumeUp";
import VolumeDown from "assets/svg/VolumeDown";
import SkipSong from "assets/svg/SkipSong";
import PrevSong from "assets/svg/PrevSong";
import c from "../styles/Test4.module.css";

export default function Test4() {
  let rap = useRef(null);
  let toastDuration = 350;
  let songs = [
    "bensound-buddy.mp3",
    "bensound-dubstep.mp3",
    "bensound-happyrock.mp3",
  ];
  const [song, setSong] = useState(songs[1]);
  const [state, setState] = useState(null);
  const wheelGestures = WheelGestures();

  useEffect(function mount() {
    rap.current.audioEl.current.volume = 0.5;
    // handle playstate lateron
    // console.log(window.document.body);
    let element = window.document.body;
    element.addEventListener("click", () => {
      state ? setState(true) : setState(false);
    });
    wheelGestures.observe(element);

    wheelGestures.on("wheel", (wheelEventState) => {
      if (wheelEventState.isEnding) {
        let axis = wheelEventState.axisMovement;
        if (
          axis[1] > 20 &&
          rap.current.audioEl.current.volume <= 1 &&
          rap.current.audioEl.current.volume >= 0
        ) {
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
        } else if (
          axis[1] < -20 &&
          rap.current.audioEl.current.volume <= 1 &&
          rap.current.audioEl.current.volume > 0.2
        ) {
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
        } else if (axis[0] > 20 && axis[1] < 20 && axis[1] > -20) {
          Toast.info("Next song", toastDuration);
          rap.current.audioEl.current.src = songs[2];
          setSong(songs[2]);
        } else if (axis[0] < -20 && axis[1] < 20 && axis[1] > -20) {
          Toast.info("Previous song", toastDuration);
          rap.current.audioEl.current.src = songs[0];
          setSong(songs[0]);
        }
      }
    });
  }, []);

  console.log(state);

  return (
    <>
      <Centered>
        {/* <Link href="/">⇦ Back</Link> */}
        {state ? <Title>♫ {song} ♫</Title> : <Title></Title>}
        <div className={`${c.outerBox}`}>
          {/* <span className={c.label}>Use your trackpad</span> */}
          <div className={`${c.wheelIndicator}`}>
            <div className={c.fingers}>
              <span className={c.finger} />
              <span className={c.finger} />
            </div>
          </div>
        </div>
        <ReactAudioPlayer src={songs[1]} ref={rap} id="player" />
      </Centered>
      <IconBox>
        <VolumeUp />
        <SkipSong />
        <VolumeDown />
        <PrevSong />
      </IconBox>
    </>
  );
}

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  height: 100vh;
  width: 100vw;
  /* margin-top: 20em;
  max-height: 30vh; */

  > div {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 200px;
    width: 200px;
    transform: translateY(-50%);
    transform: translate(-50%, -50%);
    color: black;
    font-size: 1.2rem;
  }
`;

const IconBox = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: start;
  justify-items: center;

  height: 70vh;
  width: 70vh;

  position: absolute;
  left: 50%;
  top: 60%;
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

const Title = styled.p`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
`;
