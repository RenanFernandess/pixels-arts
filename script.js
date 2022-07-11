const colorPalette = document.getElementById('color-palette');
const colors = document.getElementsByClassName('color');
const pixelBoard = document.getElementById('pixel-board');
const pixels = document.getElementsByClassName('pixel');
const buttonClear = document.getElementById('clear-board');
const colorSelector = document.getElementById('box-new-color');
const inputColor = document.getElementById('new-color');
const buttonSave = document.getElementById('save-board');

const selected = () => document.querySelector('.selected');

const colorGenerator = () => {
  const [r, g, b] = ['r', 'g', 'b'].map((value) => value = Math.round(Math.random() * 250));
  return `rgb(${r}, ${g}, ${b})`;
};

const colorAdd = () => [...colors].forEach(({ style }) => {
  if (style.backgroundColor !== 'black') style.backgroundColor = colorGenerator();
});

const selectColor = ({ target: { classList } }) => {
  if (classList.contains('color')) {
    selected().classList.remove('selected');
    classList.add('selected');
  };
};

const colored = ({ target: { classList, style } }) => {
  if (classList.contains('pixel')) style
    .backgroundColor = selected().style.backgroundColor;
};

const clearBoard = () => [...pixels].map(({ style }) => { style.backgroundColor = 'white'; });

const colorSelectorAddcolor = (value) => colorSelector.style.background = value;

const selectedAddNewColor = (value) => {
  const { style } = selected();
  if (style.backgroundColor !== 'black') style.backgroundColor = value;
}

const selectNewColor = ({ target: { value } }) => {
  colorSelectorAddcolor(value);
  selectedAddNewColor(value);
}

const saveBoard = () => {
  const board = pixelBoard.innerHTML;
  localStorage.setItem('board', (JSON.stringify(board)))
}

const chargeBoard = () => {
  const board = JSON.parse(localStorage.getItem('board'));
  if (board) pixelBoard.innerHTML = board;
}

const events = () => {
  colorPalette.addEventListener('click', selectColor);
  pixelBoard.addEventListener('click', colored);
  buttonClear.addEventListener('click', clearBoard);
  inputColor.addEventListener('input', selectNewColor);
  buttonSave.addEventListener('click', saveBoard);
};

// chama functions
colorAdd();
events();

window.onload = chargeBoard;