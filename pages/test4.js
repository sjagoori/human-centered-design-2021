import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import Block from "components/block/Block.js";
import ReactAudioPlayer from "react-audio-player";
import Toast from "light-toast";
import Link from "next/link";
import { WheelGestures } from "wheel-gestures";

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
    <Centered>
      {state ? <Title>♫ {song} ♫</Title> : <Title></Title>}
      <ReactAudioPlayer src={songs[1]} ref={rap} id="player" />
    </Centered>
  );
}

const Centered = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  height: 100vh;
  width: 100vw;
  /* align-items: center;
  margin-top: 20em;
  max-height: 30vh;
  justify-content: space-between; */
`;

const Title = styled.p`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
`;
