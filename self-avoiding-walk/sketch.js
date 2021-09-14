// Self Avoiding Walk (3D)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/162-self-avoiding-walk.html
// https://youtu.be/

// Basic: https://editor.p5js.org/codingtrain/sketches/2_4gyDD_9
// With Backtracking: https://editor.p5js.org/codingtrain/sketches/dRWS3A9nq
// 3D: https://editor.p5js.org/codingtrain/sketches/D0ONOlCDT
// With Bezier: https://editor.p5js.org/codingtrain/sketches/KFbX0NWgh
// With Recursion: https://editor.p5js.org/codingtrain/sketches/UPxBk1YiB
// Random Walk with Alpha: https://editor.p5js.org/codingtrain/sketches/IEw2RkDnJ

let grid;
let spacing = 20; // ? grid item의 공간
let cols, rows;
let path = []; // ? 최근에 지나갔던 값들을 저장
let spot;

// ? 3차원 Array 반환 cols[rows[depth[]]]
function make3DArray(cols, rows, depth) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
		for (let j = 0; j < arr[i].length; j++) {
			arr[i][j] = new Array(depth);
		}
	}
	return arr;
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	cols = floor(width / spacing);
	rows = floor(height / spacing);
	depth = cols;
	background(51);
	grid = make3DArray(cols, rows, depth);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			for (let k = 0; k < depth; k++) {
				// ? 각자의 좌표 값은 index * spacing 값은 x, y, z로 그리드의 아이템이 됨
				grid[i][j][k] = new Spot(i, j, k);
			}
		}
	}
	// ? grid의 특정 지점에서 시작한 후 시작한 지점을 path에 등록 및 value를 true로 지정
	const cx = floor(cols / 2);
	// ? Spot 객체 중 cx에 해당하는 객체를 초기값으로 지정하고 이 객체는 global variable에 할당 되어 업데이트 됨
	spot = grid[cx][cx][cx];
	path.push(spot);
	spot.visited = true;
	// frameRate(1);
}

function isValid(i, j, k) {
	// ? i, j, k의 좌표 값이 각각의 한계선을 넘은 경우 isValid = false
	if (i < 0 || i >= cols || j < 0 || j >= rows || k < 0 || k >= depth) {
		return false;
	}
	// ? visited 값이 false일 때 valid하므로 움직이기 위해서는 !(exclamation mark)가 필요
	return !grid[i][j][k].visited;
}

let lerpX = 0;
let lerpY = 0;
let lerpZ = 0;

function draw() {
	background(0);

	let center = createVector(0, 0, 0);
	let minXYZ = createVector(Infinity, Infinity, Infinity);
	let maxXYZ = createVector(0, 0, 0);
	for (let v of path) {
		minXYZ.x = min(v.x, minXYZ.x);
		minXYZ.y = min(v.y, minXYZ.y);
		minXYZ.z = min(v.z, minXYZ.z);
		maxXYZ.x = max(v.x, maxXYZ.x);
		maxXYZ.y = max(v.y, maxXYZ.y);
		maxXYZ.z = max(v.z, maxXYZ.z);
	}

	// ? center 좌표 값
	center.x = (maxXYZ.x - minXYZ.x) * 0.5 + minXYZ.x;
	center.y = (maxXYZ.y - minXYZ.y) * 0.5 + minXYZ.y;
	center.z = (maxXYZ.z - minXYZ.z) * 0.5 + minXYZ.z;

	// ? 화면 전환 속도 값
	const amt = 0.05;
	lerpX = lerp(lerpX, center.x, amt);
	lerpY = lerp(lerpY, center.y, amt);
	lerpZ = lerp(lerpZ, center.z, amt);
	//orbitControl();
	// translate(-spacing * cols * 0.5, -spacing * rows * 0.5, -spacing * depth * 0.5);
	// ? 화면 회전 값
	rotateY(frameCount * 0.002);
	translate(-lerpX, -lerpY, -lerpZ);
	// for (let i = 0; i < 500000; i++) {
	// ? 좌우정면위아래 중 한 곳씩 골라 현재 좌표에서 이동 가능한 영역이면 validOptions에 등록하고,
	// ? validOptions에 등록된 좌표가 있을 경우 랜덤하게 뽑아 grid 좌표 값을 받음
	spot = spot.nextSpot();
	// ? validOptions에 element가 할당되지 않으면 undefined를 발생시키고 그렇지 않으면 path에 등록
	if (!spot) {
		// ? undefined일 경우, path에서 최근의 좌표 값을 빼내고 visited를 무효화
		// ? spot에 막히기 전 가장 최근의 값을 재할당하여 뒤로 감
		let stuck = path.pop();
		stuck.clear();
		spot = path[path.length - 1];
	} else {
		path.push(spot);
		spot.visited = true;
	}

	// ? path의 length가 모든 좌표 값의 곱과 같아지면 모든 곳을 채운 것이 되므로 종료
	if (path.length === cols * rows * depth) {
		console.log("Solved!");
		noLoop();
		// break;
	}
	//}

	// ? 선 그리기
	stroke(255);
	strokeWeight(spacing * 0.1);
	noFill();

	// ? path의 컬러 값을 계속해서 변경하여 업데이트
	colorMode(HSB);
	for (let i = 0; i < path.length - 1; i++) {
		let v1 = path[i];
		// path[i].x += random(-0.1,0.1);
		// path[i].y += random(-0.1,0.1);
		// path[i].z += random(-0.1,0.1);
		let v2 = path[i + 1];
		// let r = map(v1.i,0,cols,100, 255);
		// let g = map(v1.j,0,rows,100, 255);
		// let b = map(v1.k,0,depth,100, 255);
		// stroke(r,g,b);
		stroke((i + frameCount) % 360, 100, 100);

		line(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
	}

	// beginShape();
	// for (let spot of path) {
	//   vertex(spot.x, spot.y, spot.z);
	// }
	// endShape();

	// ? 현재 지점 표시
	stroke(255);
	strokeWeight(spacing * 0.5);
	point(spot.x, spot.y, spot.z);
}
