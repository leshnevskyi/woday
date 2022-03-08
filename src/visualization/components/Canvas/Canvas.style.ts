import styled from 'styled-components'

const CanvasElement = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: 5s;

  &.hidden {
    opacity: 0;
    transform: scale(2);
  }
`

export {CanvasElement}
