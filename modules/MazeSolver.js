export default class MazeSolver {
    constructor(cells, size) {
        this.size = size;
        this.cells = cells;
        this.visited = new Set();
        this.to_visit = [this.cells[0][0]];
        this.path = []
        this.parentMap = new Map(); 
    }

    async solve() {
        const finish = this.cells[8][8]; 
        
        while (this.to_visit.length > 0) {
            await this.sleep(100)
            let current = this.to_visit.shift();
            this.visited.add(current); 

            if (current.position.x === 8 && current.position.y === 8) {
                break; // Stop when finish 
            }

            let neighbors = this.getNeighbors(current);
            for (let neighbor of neighbors) {
                if (!this.visited.has(neighbor) && !this.to_visit.includes(neighbor)) {
                    this.to_visit.push(neighbor);
                    this.parentMap.set(neighbor, current);
                }
            }
        }
        this.constructShortestPath(finish);
        console.log("hello");
    }

    async constructShortestPath(finish) {
        let current = finish;

        while (current) {
            await this.sleep(50)
            this.path.unshift(current); // Add the current cell to the start of the path
            current = this.parentMap.get(current); // Move to the parent
        }
    }

    sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    getNeighbors(node) {
        let list = [];
        if (!node.left && node.position.x > 0) {
            list.push(this.cells[node.position.y][node.position.x - 1]);
        }
        if (!node.right && node.position.x < this.cells[0].length - 1) {
            list.push(this.cells[node.position.y][node.position.x + 1]);
        }
        if (!node.up && node.position.y > 0) {
            list.push(this.cells[node.position.y - 1][node.position.x]);
        }
        if (!node.down && node.position.y < this.cells.length - 1) {
            list.push(this.cells[node.position.y + 1][node.position.x]);
        }

        return list;
    }

    draw(ctx) {

        ctx.fillStyle = "red"
        for (const value of this.visited) {
            const xPos = value.position.x * this.size + this.size;
            const yPos = value.position.y * this.size + this.size;
            
            ctx.beginPath() 
            ctx.arc(xPos, yPos, 5, 0, Math.PI*2, false)
            ctx.fill()
        }
        
        
        ctx.fillStyle = "green"
        for (let i = 0; i < this.path.length; i++) {
            const xPos = this.path[i].position.x * this.size + this.size;
            const yPos = this.path[i].position.y * this.size + this.size;
            
            ctx.beginPath() 
            ctx.arc(xPos, yPos, 5, 0, Math.PI*2, false)
            ctx.fill()
        }
    }
}
