export default class Cell {
    constructor(position, size) {
        this.position = position;
        this.size = size;
        this.left = true;
        this.right = true;
        this.up = true;
        this.down = true;
    }

    draw(ctx) {
        const halfSize = this.size / 2;
        const xPos = this.position.x * this.size + this.size;
        const yPos = this.position.y * this.size + this.size;

        // Draw the walls based on their state
        const walls = {
            left: { moveTo: [xPos - halfSize, yPos - halfSize], lineTo: [xPos - halfSize, yPos + halfSize] },
            right: { moveTo: [xPos + halfSize, yPos - halfSize], lineTo: [xPos + halfSize, yPos + halfSize] },
            up: { moveTo: [xPos - halfSize, yPos - halfSize], lineTo: [xPos + halfSize, yPos - halfSize] },
            down: { moveTo: [xPos - halfSize, yPos + halfSize], lineTo: [xPos + halfSize, yPos + halfSize] }
        };

        // Iterate over each wall and draw it if it exists
        for (const [wall, coords] of Object.entries(walls)) {
            if (this[wall]) {
                ctx.beginPath();
                ctx.moveTo(...coords.moveTo);
                ctx.lineTo(...coords.lineTo);
                ctx.closePath();
                ctx.stroke();
            }
        }
    }
}
