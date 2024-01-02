console.log("hello");
// import _ from "./node_modules/lodash";

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
	console.log(`Shortest Path from ${atSquare} to ${toSquare}:`);
	atSquare = boardMap.get(atSquare);
	toSquare = boardMap.get(toSquare);
	if (!atSquare || !toSquare) {
		console.log("Invalid Request");
		return undefined;
	}

	let visited = new Set();
	let q = [];
	let path = [];
	q.push(atSquare);
	while (q.length > 0) {
		let tempObj = q.shift();
		let temp = tempObj.vertex ? tempObj.vertex : tempObj;
		path = tempObj.myPath ? tempObj.myPath : path;
		visited.add(temp);
		path.push(temp);
		const moves = [
			temp?.left?.left?.down,
			temp?.left?.left?.up,
			temp?.left?.up?.up,
			temp?.left?.down?.down,
			temp?.right?.right?.up,
			temp?.right?.right?.down,
			temp?.right?.up?.up,
			temp?.right?.down?.down,
		];
		for (const vertex of moves) {
			if (vertex) {
				if (vertex === toSquare) {
					// console.log(vertex);
					path.push(vertex);
					return path;
				} else if (!visited.has(vertex) && vertex) {
					q.push({ vertex, myPath: [...path] });
				}
			}
		}
	}
	return path;
}

let moves = knightMoves(`${_.random(7)},${_.random(7)}`, `${_.random(7)},${_.random(7)}`);

console.log(`You made it in ${moves.length} moves. Here is your path:`);
moves.forEach((set) => {
	console.log(`[${set.xAxis},${set.yAxis}]`);
});
