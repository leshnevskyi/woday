import {useCallback, useState} from 'react'
import {useWindowSize} from 'usehooks-ts'

import {CanvasElement} from './Canvas.style'

interface CanvasProps {
  renderer: (context: CanvasRenderingContext2D, window: {
    width: number
    height: number
  }) => void
}

const Canvas = ({renderer}: CanvasProps) => {
  const {width, height} = useWindowSize()
  const [isPresent, setIsPresent] = useState(false)

  const renderOnMount = useCallback((element: HTMLCanvasElement | null) => {
    if (!element) return;

    const context = element.getContext('2d')
    context ? renderer(context, {width, height}) : console.error(
      'The context identifier is not supported, or the canvas has already been set to a different context mode.'
    )
  }, [width, height])

  return width && height ? (
    <>
      <CanvasElement 
        width={width}
        height={height}
        ref={renderOnMount}
        className={isPresent ? undefined : 'hidden'}
        onClick={() => setIsPresent(true)}
      />
    </>
  ) : null
}

export default Canvas
