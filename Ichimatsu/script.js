let numRows = 10, numCols = 10;
let boardState = []; // 2次元配列：各セルは { color: 'black' or 'white', op: 操作番号 } または null
let cellElements = []; // 各セルのDOM要素
let operationCount = 0;
let paintedCount = 0;

const boardContainer = document.getElementById('boardContainer');
const rowsInput = document.getElementById('rowsInput');
const colsInput = document.getElementById('colsInput');
const createBoardButton = document.getElementById('createBoardButton');
const nextButton = document.getElementById('nextButton');
const operationCountSpan = document.getElementById('operationCount');
const paintedCountSpan = document.getElementById('paintedCount');

// 盤面作成：既存のDOM要素は再生成せず、配列とDOMを新規生成する
function createBoard() {
  numRows = parseInt(rowsInput.value);
  numCols = parseInt(colsInput.value);
  boardState = [];
  cellElements = [];
  paintedCount = 0;
  operationCount = 0;
  updateStatus();

  // 盤面のグリッド設定（行×列）
  boardContainer.style.gridTemplateColumns = `repeat(${numCols}, 40px)`;
  boardContainer.style.gridTemplateRows = `repeat(${numRows}, 40px)`;
  boardContainer.innerHTML = ''; // 既存のセルをクリア

  for (let i = 0; i < numRows; i++) {
    boardState[i] = [];
    cellElements[i] = [];
    for (let j = 0; j < numCols; j++) {
      boardState[i][j] = null;
      const cell = document.createElement('div');
      cell.classList.add('cell');
      boardContainer.appendChild(cell);
      cellElements[i][j] = cell;
    }
  }
  nextButton.disabled = false;
}

// セルのDOMを更新する
function updateCell(i, j) {
  const cell = cellElements[i][j];
  const data = boardState[i][j];
  cell.textContent = data ? data.op : '';
  cell.classList.remove('black', 'white');
  if (data) {
    cell.classList.add(data.color);
  }
}

// ステータス表示の更新
function updateStatus() {
  operationCountSpan.textContent = operationCount;
  paintedCountSpan.textContent = paintedCount;
}

// 次の操作を行う関数
function nextOperation() {
  operationCount++;
  let newPainted = 0;
  
  if (operationCount === 1) {
    // 初回: 左上のセル (0,0) を黒で塗る
    if (boardState[0][0] === null) {
      boardState[0][0] = { color: 'black', op: operationCount };
      updateCell(0, 0);
      newPainted++;
      paintedCount++;
    }
  } else if (operationCount % 2 === 0) {
    // 偶数回目: 黒セルの左右（同じ行）の未塗装セルを白で塗る
    const toPaint = [];
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (boardState[i][j] && boardState[i][j].color === 'black') {
          // 左隣（同じ行, j-1）
          if (j - 1 >= 0 && boardState[i][j - 1] === null) {
            toPaint.push([i, j - 1]);
          }
          // 右隣（同じ行, j+1）
          if (j + 1 < numCols && boardState[i][j + 1] === null) {
            toPaint.push([i, j + 1]);
          }
        }
      }
    }
    toPaint.forEach(([i, j]) => {
      if (boardState[i][j] === null) {
        boardState[i][j] = { color: 'white', op: operationCount };
        updateCell(i, j);
        newPainted++;
        paintedCount++;
      }
    });
  } else {
    // 奇数回目（3, 5, ...）： 白セルの上下（同じ列）の未塗装セルを黒で塗る
    const toPaint = [];
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (boardState[i][j] && boardState[i][j].color === 'white') {
          // 上隣（同じ列, i-1）
          if (i - 1 >= 0 && boardState[i - 1][j] === null) {
            toPaint.push([i - 1, j]);
          }
          // 下隣（同じ列, i+1）
          if (i + 1 < numRows && boardState[i + 1][j] === null) {
            toPaint.push([i + 1, j]);
          }
        }
      }
    }
    toPaint.forEach(([i, j]) => {
      if (boardState[i][j] === null) {
        boardState[i][j] = { color: 'black', op: operationCount };
        updateCell(i, j);
        newPainted++;
        paintedCount++;
      }
    });
  }
  
  updateStatus();
  if (newPainted === 0) {
    alert('これ以上塗るマスがありません！');
    nextButton.disabled = true;
  }
}

createBoardButton.addEventListener('click', createBoard);
nextButton.addEventListener('click', nextOperation);

// 初回は自動で盤面を作成（任意）
createBoard();
