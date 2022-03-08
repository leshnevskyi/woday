const renderer = (context: CanvasRenderingContext2D, window: {
  width: number 
  height: number
}) => {  
  function renderCircle (
    x: number, 
    y: number, 
    radius: number, 
    fillStyle: string | CanvasGradient | CanvasPattern = '#222222'
  ) {
    context.beginPath()
    context.fillStyle = fillStyle
    context.arc(x, y, radius, 0, 2 * Math.PI)
    context.fill()
  }

  const flowerEquation = (angle: number) => {
    const radius = Math.sin(1.2 * angle) ** 2 + Math.cos(6 * angle) ** 3

    return radius
  }

  function renderFlowerOuline(
    rotationAngle = 0, scaling = 1, color = 'hsl(350 75% 35%)'
  ) {
    const defaultScaling = 200
    const oulineWidth = 2
    const step = Math.PI / 180 / 10

    for (let angle = 0; angle <= Math.PI * 10; angle += step) {
      const radius = flowerEquation(angle) * defaultScaling * scaling
      
      const x = radius * Math.cos(angle + rotationAngle)
      const y = radius * Math.sin(angle + rotationAngle)
      renderCircle(
        x + window.width / 2, y + window.height / 2, oulineWidth, color
      )
    }
  }

  function getTransitionalValues(
    minValue: number, maxValue: number, stepCount: number
  ) {
    const step = (maxValue - minValue) / stepCount

    return new Array(stepCount + 1).fill(null).map((_, index) => {
      return minValue + step * index
    })
  }

  function renderFlower() {
    const outlineCount = 100

    const hues = getTransitionalValues(310, 360, outlineCount)
    const opacities = getTransitionalValues(0, 0.05, outlineCount)
    const lightnesses = getTransitionalValues(30, 70, outlineCount).reverse()
    
    const colors = new Array(100).fill(null).map((_, index) => {
      return `hsl(${hues[index]} 75% ${lightnesses[index]}% / ${opacities[index]})`
    })

    const scalings = getTransitionalValues(0.5, 4, outlineCount)

    for (let i = 0; i < outlineCount; i++) {
      renderFlowerOuline(0, scalings[i], colors[i])
      renderFlowerOuline(Math.PI / 2, scalings[i] * 0.7, colors[i])
      renderFlowerOuline(Math.PI / 2, scalings[i] * 0.3, colors[i])
    }
  }

  renderFlower()
}

export default renderer
