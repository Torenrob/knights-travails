let boardMap = new Map();

class boardSquare {
	constructor(x, y) {
		this.xAxis = x;
		this.yAxis = y;
		this.left = null;
		this.right = null;
		this.up = null;
		this.down = null;
		this.edges = [];
	}

	setEdges(boardLength, boardHeight) {
		let xMinus = `${this.xAxis - 1}`;
		let xPlus = `${this.xAxis + 1}`;
		let yMinus = `${this.yAxis - 1}`;
		let yPlus = `${this.yAxis + 1}`;
		let y = `${this.yAxis}`;
		let x = `${this.xAxis}`;

		this.left = this.xAxis == 0 ? null : boardMap.get(`${xMinus},${y}`);
		this.right = this.xAxis == boardLength - 1 ? null : boardMap.get(`${xPlus},${y}`);
		this.up = this.yAxis == boardHeight - 1 ? null : boardMap.get(`${x},${yPlus}`);
		this.down = this.yAxis == 0 ? null : boardMap.get(`${x},${yMinus}`);
		this.edges.push(this.left, this.right, this.up, this.down);
	}
}

class Board {
	constructor(length, height) {
		this.corner = this.buildBoard(length, height);
	}

	buildBoard(length, height) {
		for (let x = 0; x < length; x++) {
			for (let y = 0; y < height; y++) {
				let square = new boardSquare(x, y);
				boardMap.set(`${x},${y}`, square);
			}
		}
		boardMap.forEach((square) => {
			square.setEdges(length, height);
		});
		return boardMap.get("0,0");
	}
}

let board = new Board(8, 8);

function knightMoves(atSquare, toSquare) {
	atSquare = boardMap.get(atSquare);
	toSquare = boardMap.get(toSquare);

	let visited = new Set();
	let q = [];
	let prev = new Set();
	q.push(atSquare);
	while (q.length > 0) {
		let temp = q.shift();
		const connect = temp.edges;

		for (const vertex of connect) {
			if (vertex === toSquare) {
				prev.add(temp);
				prev.add(vertex);
				return prev;
			} else if (!visited.has(vertex) && vertex) {
				prev.add(temp);
				q.push(vertex);
				visited.add(vertex);
			}
		}
	}
}

let moves = knightMoves("5,2", "1,7");

console.log(`You made it in ${moves.size} moves. Here is your path:`);
moves.forEach((set) => {
	console.log(`[${set.xAxis},${set.yAxis}]`);
});
