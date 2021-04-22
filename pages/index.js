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
