import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <Centered>
      <Link href="/test1">Prototype 1</Link>
      <Link href="/test2">Prototype 2</Link>
      <Link href="/test3">Prototype 3</Link>
      <Link href="/test4">Prototype 4</Link>
    </Centered>
  );
}

const Centered = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;
  align-items: center;
  justify-content: center;

  a {
    padding: 10px;
    background-color: blue;
    color: white;
    border-radius: 5px;
    margin-bottom: 10px;

    &:nth-child(-n + 2) {
      background-color: transparent;
      border: 1px solid #c1c1c1;
      color: #c1c1c1;
    }
  }
`;

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
