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
    wheelGestures.observe(window.document.getElementById("player"));

    wheelGestures.on("wheel", (wheelEventState) => {
      if (wheelEventState.isEnding) {
        let axis = wheelEventState.axisMovement;
        console.log(axis);
        if (axis[1] > 20) {
          Toast.info("going up", toastDuration);
        } else if (axis[1] < -20) {
          Toast.info("going down", toastDuration);
        } else if (axis[0] > 20 && axis[1] < 20 && axis[1] > -20) {
          Toast.info("going right", toastDuration);
        } else if (axis[0] < -20 && axis[1] < 20 && axis[1] > -20) {
          Toast.info("going left", toastDuration);
        }
      }
    });
  }, []);

  return (
    <Centered>
      <ReactAudioPlayer controls src={songs[1]} ref={rap} id="player" />
    </Centered>
  );
}

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  margin-top: 20em;
  max-height: 30vh;
  justify-content: space-between;
`;

const Description = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 0;
  max-width: 300px;
`;
