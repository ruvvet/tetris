// block class
// extended classes for each of the 7 shapes

const GRID_SIZE = 50;
const COLUMNS = 10;
const ROWS = 20;
const CANVAS_WIDTH = GRID_SIZE * COLUMNS;
const CANVAS_HEIGHT = GRID_SIZE * ROWS;

const colors = ['red', 'blue', 'green', 'yellow'];

let ctx = null;

let fallingPiece = null;
const stack = {};

class Shape {
  constructor(color, position, rotation) {
    this.color = color;
    this.position = position;
    this.rotation = rotation;
  }

  render() {
    ctx.fillStyle = this.color;
    for (const { x, y } of this.getSpaces()) {
      ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }
  }
}

class I extends Shape {
  constructor(color, position, rotation) {
    super(color, position, rotation);
  }

  getSpaces(opts) {
    const { x, y, rotation } = {
      x: this.position.x,
      y: this.position.y,
      rotation: this.rotation,
      ...opts,
    };

    if (rotation % 180 === 0) {
      return [
        { x, y },
        { x: x + 1, y },
        { x: x - 1, y },
        { x: x - 2, y },
      ];
    }
    return [
      { x, y },
      { x, y: y - 1 },
      { x, y: y - 2 },
      { x, y: y + 1 },
    ];
  }
}

class O extends Shape {
  constructor(color, position, rotation) {
    super(color, position, rotation);
  }

  getSpaces(opts) {
    const { x, y, rotation } = {
      x: this.position.x,
      y: this.position.y,
      rotation: this.rotation,
      ...opts,
    };

    return [
      { x, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x: x - 1, y: y + 1 },
    ];
  }
}

class S extends Shape {
  constructor(color, position, rotation) {
    super(color, position, rotation);
  }

  getSpaces(opts) {
    const { x, y, rotation } = {
      x: this.position.x,
      y: this.position.y,
      rotation: this.rotation,
      ...opts,
    };

    if (rotation % 180 === 0) {
      return [
        { x, y },
        { x: x + 1, y },
        { x, y: y + 1 },
        { x: x - 1, y: y + 1 },
      ];
    }
    return [
      { x, y },
      { x, y: y - 1 },
      { x: x + 1, y },
      { x: x + 1, y: y + 1 },
    ];
  }
}

class Z extends Shape {
  constructor(color, position, rotation) {
    super(color, position, rotation);
  }

  getSpaces(opts) {
    const { x, y, rotation } = {
      x: this.position.x,
      y: this.position.y,
      rotation: this.rotation,
      ...opts,
    };

    if (rotation % 180 === 0) {
      return [
        { x, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x: x + 1, y: y + 1 },
      ];
    }
    return [
      { x, y },
      { x, y: y - 1 },
      { x: x - 1, y },
      { x: x - 1, y: y + 1 },
    ];
  }
}

class T extends Shape {
  constructor(color, position, rotation) {
    super(color, position, rotation);
  }

  getSpaces(opts) {
    const { x, y, rotation } = {
      x: this.position.x,
      y: this.position.y,
      rotation: this.rotation,
      ...opts,
    };

    if (rotation === 90) {
      return [
        { x, y },
        { x, y: y + 1 },
        { x, y: y - 1 },
        { x: x + 1, y },
      ];

      // TODO: can probably replace with ternary inside x/y
    }

    if (rotation === 180) {
      return [
        { x, y },
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y - 1 },
      ];
    }

    if (rotation === 270) {
      return [
        { x, y },
        { x, y: y + 1 },
        { x, y: y - 1 },
        { x: x - 1, y },
      ];
    }
    return [
      { x, y },
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y + 1 },
    ];
  }
}

class L extends Shape {
  constructor(color, position, rotation) {
    super(color, position, rotation);
  }

  getSpaces(opts) {
    const { x, y, rotation } = {
      x: this.position.x,
      y: this.position.y,
      rotation: this.rotation,
      ...opts,
    };

    if (rotation === 90) {
      return [
        { x, y },
        { x, y: y - 1 },
        { x: x - 1, y },
        { x: x - 2, y },
      ];
    }

    if (rotation === 180) {
      return [
        { x, y },
        { x, y: y + 1 },
        { x, y: y + 2 },
        { x: x - 1, y },
      ];
    }

    if (rotation === 270) {
      return [
        { x, y },
        { x, y: y + 1 },
        { x: x + 1, y },
        { x: x + 2, y },
      ];
    }
    return [
      { x, y },
      { x, y: y - 1 },
      { x, y: y - 2 },
      { x: x + 1, y },
    ];
  }
}

class J extends Shape {
  constructor(color, position, rotation) {
    super(color, position, rotation);
  }

  getSpaces(opts) {
    const { x, y, rotation } = {
      x: this.position.x,
      y: this.position.y,
      rotation: this.rotation,
      ...opts,
    };

    if (rotation === 90) {
      return [
        { x, y },
        { x, y: y + 1 },
        { x: x - 1, y },
        { x: x - 2, y },
      ];
    }

    if (rotation === 180) {
      return [
        { x, y },
        { x, y: y + 1 },
        { x, y: y + 2 },
        { x: x + 1, y },
      ];
    }

    if (rotation === 270) {
      return [
        { x, y },
        { x, y: y - 1 },
        { x: x + 1, y },
        { x: x + 2, y },
      ];
    }
    return [
      { x, y },
      { x, y: y - 1 },
      { x, y: y - 2 },
      { x: x - 1, y },
    ];
  }
}

const shapes = [I, O, S, Z, T, L, J];

/////////////////

const getCoordinates = (key) => key.split(',').map((c) => parseInt(c));

const generateColor = () => colors[Math.floor(Math.random() * colors.length)];

const generateShape = () => {
  return new shapes[Math.floor(Math.random() * shapes.length)](
    generateColor(),
    { x: Math.floor(COLUMNS / 2), y: 0 },
    0
  );
};

const init = () => {
  const canvas = document.getElementById('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  ctx = canvas.getContext('2d');

  document.addEventListener('keyup', (e) => {
    if (!fallingPiece) {
      return;
    }

    if (
      e.key === 'ArrowLeft' &&
      !checkCollision(
        fallingPiece.getSpaces({ x: fallingPiece.position.x - 1 })
      )
    ) {
      fallingPiece.position.x -= 1;
    } else if (
      e.key === 'ArrowRight' &&
      !checkCollision(
        fallingPiece.getSpaces({ x: fallingPiece.position.x + 1 })
      )
    ) {
      fallingPiece.position.x += 1;
    } else if (
      e.key === 'ArrowDown' &&
      !checkCollision(
        fallingPiece.getSpaces({ y: fallingPiece.position.y + 1 })
      )
    ) {
      fallingPiece.position.y += 1;
    } else if (
      e.key === 'ArrowUp' &&
      !checkCollision(
        fallingPiece.getSpaces({ rotation: (fallingPiece.rotation + 90) % 360 })
      )
    ) {
      fallingPiece.rotation = (fallingPiece.rotation + 90) % 360;
    }
  });

  //randomly select upcoming  []

  fallingPiece = generateShape();

  // start game loop
  gameLoop();
};

const drawGrid = () => {
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.strokeStyle = '#999999';
  for (let i = 0; i <= CANVAS_WIDTH; i += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, CANVAS_HEIGHT);
    ctx.stroke();
  }

  for (let i = 0; i <= CANVAS_HEIGHT; i += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(CANVAS_WIDTH, i);
    ctx.stroke();
  }
};

const drawPiece = () => {
  if (!fallingPiece) {
    return;
  }

  fallingPiece.render();
};

const drawStack = () => {
  for (const key of Object.keys(stack)) {
    const [x, y] = getCoordinates(key);
    ctx.fillStyle = stack[key];
    ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }
};

const checkCollision = (spaces) => {
  for (const { x, y } of spaces) {
    if (stack[`${x},${y}`] || y >= ROWS || x < 0 || x >= COLUMNS) {
      return true;
    }
  }
  return false;
};

const updateStack = (clearedRow) => {
  for (const space in stack) {
    const [x, y] = getCoordinates(space);
    if (y <= clearedRow) {
      stack[`${x},${y + 1}`] = stack[space];
      delete stack[`${x},${y}`];
    }
  }
  //😥
  // stack = { ...stack, ...updatedStack };
};

const checkLineClear = () => {
  let clear = false;
  // let gravity = 0;
  const counter = {};

  for (const space in stack) {
    const [x, y] = getCoordinates(space);
    counter[y] = (counter[y] || 0) + 1;
  }

  for (const row in counter) {
    if (counter[row] === COLUMNS) {
      clear = true;
      // gravity += 1;
      for (let i = 0; i < COLUMNS; i++) {
        // clear the row from the stack
        delete stack[`${i},${row}`];
      }
      // add +1 to y coordinate for all stack
      updateStack(row);
    }
  }

  if (!clear) {
    return;
  }
};

const checkGameOver = () => {
  for (const space in stack) {
    const [x, y] = getCoordinates(space);
    if (y === 0) {
      console.log('game over');
      return true;
    }
  }
  return false;
};

let lastUpdate = Date.now();
const gameLoop = () => {
  const now = Date.now();
  if (now - lastUpdate >= 1000) {
    if (fallingPiece) {
      // check if its going to overlap with the stack

      if (
        checkCollision(
          fallingPiece.getSpaces({ y: fallingPiece.position.y + 1 })
        )
      ) {
        // add pieces to stack
        for (const { x, y } of fallingPiece.getSpaces()) {
          stack[`${x},${y}`] = fallingPiece.color;
        }

        checkLineClear();
        if (checkGameOver()) {
          console.log('its really over');
          return;
        }
        fallingPiece = generateShape();
        console.log(fallingPiece);
      } else {
        fallingPiece.position.y += 1;
      }
    }

    lastUpdate = now;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid(ctx);
  drawStack();
  drawPiece();

  requestAnimationFrame(gameLoop);
};

document.addEventListener('DOMContentLoaded', init);
