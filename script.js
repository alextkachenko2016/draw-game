/* General */
const grid = document.querySelector(".grid")
const page = document.querySelector(".main")

/* Default background color, pen color, number of squares inside grid */
grid.style.backgroundColor = "#FFFFFF"
let squareColor = "#000000"
function createSquare() {
  const square = document.createElement("div")
  square.classList.add("square", "square-border")
  grid.appendChild(square)
}
let squaresNumber = 30
grid.style.cssText += `grid-template-columns: repeat(${squaresNumber}, 1fr)`
for (sq = 1; sq <= squaresNumber * squaresNumber; sq++) {
  createSquare()
}
let squares = document.querySelectorAll(".square")

/* Remove, Add gridlines */
const gridLines = document.querySelector(".grid-line")
function removeGridLines() {
  squares.forEach((square) => square.classList.remove("square-border"))
}
function addGridLines() {
  squares.forEach((square) => square.classList.add("square-border"))
}

/* Clear all (Clear the grid only) */
const clearBtn = document.querySelector(".clear")
function resetAllSquare() {
  squares.forEach((square) => {
    if (square.style.cssText) square.removeAttribute("style")
  })
}
clearBtn.addEventListener("click", resetAllSquare)
/* Change grid size & badge */
const gridSizeBar = document.querySelector(".size-adjust #slider")
function changeGridBadge(squaresNumber) {
  let gridSizeBadge = document.querySelector(".size-adjust p")
  gridSizeBadge.innerText = `Grid Size: ${squaresNumber} x ${squaresNumber}`
}
function changeGridSize() {
  resetAllSquare()
  squaresNumber = parseInt(this.value)
  if (isNaN(squaresNumber)) {
    squaresNumber = 30
    gridSizeBar.value = "30"
  }
  changeGridBadge(squaresNumber)
  grid.style.cssText += `grid-template-columns: repeat(${squaresNumber}, 1fr)`
  while (squares.length < squaresNumber * squaresNumber - 1) {
    squares = document.querySelectorAll(".square")
    createSquare()
  }
  while (squares.length > squaresNumber * squaresNumber + 1) {
    squares = document.querySelectorAll(".square")
    squares[0].parentNode.removeChild(squares[0])
  }
  squares = document.querySelectorAll(".square")
  if (!gridLines.classList.contains("btn-on")) removeGridLines()
}
gridSizeBar.addEventListener("input", (event) => {
  squaresNumber = event["target"].value
  changeGridBadge(squaresNumber)
})
gridSizeBar.addEventListener("mouseup", changeGridSize)