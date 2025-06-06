(function() {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const grid = 20;
  let count = 0;
  const initialSpeed = 8; // higher value = slower snake
  let speed = initialSpeed;
  const snake = {
    x: 160,
    y: 160,
    cells: [],
    maxCells: 4
  };
  const apple = {
    x: 320,
    y: 320
  };
  let dx = grid;
  let dy = 0;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function resetGame() {
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    dx = grid;
    dy = 0;
    speed = initialSpeed;
    apple.x = getRandomInt(0, 20) * grid;
    apple.y = getRandomInt(0, 20) * grid;
  }

  function loop() {
    requestAnimationFrame(loop);
    if (++count < speed) {
      return;
    }
    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += dx;
    snake.y += dy;

    if (snake.x < 0 ||
        snake.x >= canvas.width ||
        snake.y < 0 ||
        snake.y >= canvas.height) {
      resetGame();
    }

    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, grid-1, grid-1);

    ctx.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {
      ctx.fillRect(cell.x, cell.y, grid-1, grid-1);

      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;
        if (speed > 2) {
          speed--;
        }
        apple.x = getRandomInt(0, 20) * grid;
        apple.y = getRandomInt(0, 20) * grid;
      }

      for (let i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          resetGame();
        }
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.which === 37 && dx === 0) { // left
      dx = -grid; dy = 0;
    } else if (e.which === 38 && dy === 0) { // up
      dy = -grid; dx = 0;
    } else if (e.which === 39 && dx === 0) { // right
      dx = grid; dy = 0;
    } else if (e.which === 40 && dy === 0) { // down
      dy = grid; dx = 0;
    }
  });

  requestAnimationFrame(loop);
})();
