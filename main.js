import Maze from "./modules/Maze.js"
import MazeSolver from "./modules/MazeSolver.js"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 500
canvas.height = 500

const maze = new Maze(10, 10, canvas.width / 10)
const solver = new MazeSolver(maze.cells, canvas.width / 10)
function setup() {
    maze.randomize()
    solver.solve()
    draw()
}

function draw() {
    
    maze.draw(ctx)
    solver.draw(ctx)
    requestAnimationFrame(draw)
}

setup()