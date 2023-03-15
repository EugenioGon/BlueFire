const firePixelArray = []
const fireWidth = 150
const fireHeight = 50
const fireColorsPalette = [{ "r": 7, "g": 7, "b": 7 }, { "r": 7, "g": 7, "b": 31 }, { "r": 7, "g": 15, "b": 47 }, { "r": 1, "g": 15, "b": 71 }, { "r": 7, "g": 23, "b": 87 }, { "r": 7, "g": 31, "b": 103 }, { "r": 7, "g": 31, "b": 119 }, { "r": 7, "g": 39, "b":143  }, { "r": 7, "g": 47, "b": 159 }, { "r": 7, "g": 63, "b": 175 }, { "r": 7, "g": 71, "b": 191 }, { "r": 7, "g": 50, "b": 150 }, { "r": 7, "g": 120, "b": 233 }, { "r": 7, "g": 87, "b": 233 }, { "r": 7, "g": 87, "b": 223 }, { "r": 7, "g": 95, "b": 215 }, { "r": 7, "g": 95, "b": 215 }, { "r": 15, "g": 103, "b": 215 }, { "r": 15, "g": 111, "b": 207 }, { "r": 15, "g": 119, "b": 207 }, { "r": 15, "g": 127, "b": 207 }, { "r": 23, "g": 135, "b": 217 }, { "r": 23, "g": 135, "b": 199 }, { "r": 23, "g": 143, "b": 199 }, { "r": 31, "g": 151, "b": 199 }, { "r": 31, "g": 159, "b": 191 }, { "r": 31, "g": 159, "b": 191 }, { "r": 39, "g": 167, "b": 191 }, { "r": 39, "g": 167, "b": 191 }, { "r": 47, "g": 175, "b": 191 }, { "r": 47, "g": 175, "b": 183 }, { "r": 7, "g": 183, "b": 183 }, { "r": 7, "g": 183, "b": 183 }, { "r": 70, "g": 207, "b": 207 }, { "r": 220, "g": 225, "b": 223 }, { "r": 239, "g": 239, "b": 239 }, { "r": 255, "g": 255, "b": 255 }]


function start() {
  createFireDataStructure()
  createFireSource()
  rendeFire()

  setInterval(calculateFirePropagation, 50)
}
function createFireDataStructure() {
  const numberOfPixels = fireWidth * fireHeight

  for (let i = 0; i < numberOfPixels; i++) {
    firePixelArray[i] = 0
  }
}

function calculateFirePropagation() {
  for (let column = 0; column < fireWidth; column++) {
    for (let row = 0; row < fireHeight; row++) {
      const pixelIndex = column + (fireWidth * row)

      updaterFireIntensityPerPixel(pixelIndex)
    }
  }

  rendeFire()
}

function updaterFireIntensityPerPixel(currentPixelIndex) {
  const belowPixelIndex = currentPixelIndex + fireWidth

  if (belowPixelIndex >= fireWidth * fireHeight) {
    return
  }

  const decay = Math.floor(Math.random() *3)
  const belowPixelFireIntensity = firePixelArray[belowPixelIndex]
  const newFireIntensity = belowPixelFireIntensity - decay >= 0 ?
    belowPixelFireIntensity - decay : 0

  firePixelArray[currentPixelIndex + decay] = newFireIntensity

}

function rendeFire() {
  const debug = false
  let html = '<table cellpadding=0 cellspacing=0>'

  for (let row = 0; row < fireHeight; row++) {
    html += '<tr>'

    for (let column = 0; column < fireWidth; column++) {
      const pixelIndex = column + (fireWidth * row)
      const fireIntensity = firePixelArray[pixelIndex]

      if (debug === true) {
        html += '<td>'
        html += `<div class=pixel-index>${pixelIndex}</div>`
        html += fireIntensity
        html += '</td>'
      } else {
        const color = fireColorsPalette[fireIntensity]
        const colorString = `${color.r},${color.g},${color.b}`
        html += `<td class= "pixel" style="background-color: rgb(${colorString})">`
        html += '</td>'
      }
    }

    html += '</tr>'
  }
  html += '</table>'

  document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource() {
  for (let column = 0; column <= fireWidth; column++) {
    const overflowPixelIndex = fireWidth * fireHeight
    const pixelIndex = (overflowPixelIndex - fireWidth) + column

    firePixelArray[pixelIndex] = 36
  }
}

start()