const canvas = document.getElementById("snake")
const ctx = canvas.getContext("2d")

const boxX = 33
const boxY = 33
const lengthX = 594
const lengthY = 363

var snake = []
var point = 0
var ground = new Image()
ground.src = "img/ground.png"

var apple = new Image()
apple.src = "img/food.png"
snake[0] = {
  x: 3 * boxX,
  y: 3 * boxY
}

let food = {
  x: Math.floor(Math.random() * 18) * boxX,
  y: Math.floor(Math.random() * 11) * boxY
}

let score = 0
const colors = ['Gold', 'Silver', 'PeachPuff', 'PaleGodenrod', 'green', 'yellow', 'GreenYellow', 'Aqua', 'red', 'purple', 'MediumAquamarine', 'blue', 'orange']

document.addEventListener("keydown", direction)
var dir = "";
function direction(event) {
  let key = event.key
  if ((key === "w" || key === "ArrowUp") && dir != "DOWN") {
    dir = "UP"
  }
  else if ((key === "s" || key === "ArrowDown") && dir != "UP") {
    dir = "DOWN"
  }
  else if ((key === "a" || key === "ArrowLeft") && dir != "RIGHT") {
    dir = "LEFT"
  }
  else if ((key === "d" || key === "ArrowRight") && dir != "LEFT") {
    dir = "RIGHT"
  }
}
function collision(array, head) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true
  }
  return false
}
function draw() {
  ctx.drawImage(ground, 0, 0)
  for (let i = 0; i < snake.length; i++) {
    rdm = Math.floor(Math.random() * colors.length)
    ctx.fillStyle = (i == 0) ? "black" : colors[rdm]
    ctx.fillRect(snake[i].x, snake[i].y, boxX, boxY)
  }
  ctx.drawImage(apple, food.x, food.y)
  ctx.fillStyle = "black"
  ctx.font = '45px Changa One'
  ctx.fillText(score, 0 * boxX, 1.6 * boxX)
  let snakeX = snake[0].x
  let snakeY = snake[0].y
  if (dir === "LEFT") snakeX = snakeX - boxX
  if (dir === "RIGHT") snakeX = snakeX + boxX
  if (dir === "UP") snakeY = snakeY - boxY
  if (dir === "DOWN") snakeY = snakeY + boxY

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    point++;
    food = {
      x: Math.floor(Math.random() * 18) * boxX,
      y: Math.floor(Math.random() * 11) * boxY
    }
  }
  else {
    snake.pop()//删除并返回数组最后一个元素
  }
  let newHead = {
    x: snakeX,
    y: snakeY
  }
  console.log(snakeX, snakeY)

  if (snakeX < 0 || snakeX > 18 * boxX || snakeY < 0 || snakeY > 11 * boxY || collision(snake, newHead)) {
    clearInterval(game)
    setTimeout(() => { alert(`GameOver! your point is ${point}`) }, 150)
  }
  snake.unshift(newHead)
}

game = setInterval(draw, 150)
