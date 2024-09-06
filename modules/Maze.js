import Cell from "./Cell.js"

export default class Maze {
    constructor(rows, cols, cell_size) {
        this.rows = rows
        this.cols = cols
        this.cell_size = cell_size
        this.cells = []
        this.create_cells()

    }

    create_cells() {
        this.cells = []
        for (let y = 0; y < this.rows - 1; y++) {
            const row = []
            for (let x = 0; x < this.cols - 1; x++) {
                row.push(new Cell({ x: x, y: y}, this.cell_size))
            }
            this.cells.push(row)
        }
    }

    notBroken(cell) {
        return cell.left && cell.right && cell.up && cell.down;
    }

    outOfRange(pos, direction) {

        return pos.x + direction.x < 0 || pos.x + direction.x > this.rows-2 || pos.y + direction.y < 0 || pos.y + direction.y > this.cols-2
    }

    getValidDirection(pos) {
        const directions = [
            {
                x: -1, y: 0, dir: "left"
            },
            {
                x: 1, y: 0, dir: "right"
            },
            {
                x: 0, y: -1, dir: "up"
            },
            {
                x: 0, y: 1, dir: "down"
            },
        ]

        // shuffle a the direction adn grab the first one if its not valid go to the next osv
        let shuffled = this.shuffle(directions)
        for (let i = 0; i < shuffled.length; i++) {
            if (!this.outOfRange(pos, shuffled[i])) {
                if (this.notBroken(this.cells[pos.y + shuffled[i].y][pos.x + shuffled[i].x])) {
                    return shuffled[i]
                }
            }
        }
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    findNewPath(path) {
        for (let i = path.length-1; i >= 0; i--) {
            const element = path[i];
            let newDirection = this.getValidDirection(element.position)
            if (newDirection ) {
                return {pos: element, dir: newDirection}
            }
        }
        return null
    }

    randomize() {

        let current = this.cells[0][0]

        let path = []

        while (true) {

            let direction = this.getValidDirection(current.position)
            
            if (direction == null) {
                console.log("no available direction");
                console.log("backtracking");
                let newPosition = this.findNewPath(path)
                
                if (newPosition == null) { // if current is empty there is no more paths to be made
                    break
                }

                current = newPosition.pos
                direction = newPosition.dir
            }
            

            let newX = current.position.x + direction.x
            let newY = current.position.y + direction.y
            let next = this.cells[newY][newX]
            
            path.push(current) 

            switch (direction.dir) {
                case "left":
                    current.left = false
                    next.right = false
                    break;
                case "right":
                    current.right = false
                    next.left = false
                    break;
                case "up":
                    current.up = false
                    next.down = false
                    break;
                case "down":
                    current.down = false
                    next.up = false
                    break;
            }

            current = next

        }
    }

    draw(ctx) {
        const length = this.cells.length
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                this.cells[i][j].draw(ctx);
            }
        }
    }
}