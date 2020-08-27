const TILE_OPTION_NUMBER = 7
const gameTable = document.querySelector('.game-area__game');

const state = {
    gameStart: false,
    worldMatrix: [],
    selectedTool: -1, //0-2
    lastMindedTile: -1, //0-5
}

const createWorld = (mat) => {

    for (let i = 0; i < mat.length; i++) {
        const line = document.createElement('div');
        line.classList.add('row');

        for (let j = 0; j < mat[i].length; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');

            for (const [key, value] of Object.entries(mat[i][j])) {
                tile.dataset[key] = value;
            }
            line.appendChild(tile);
        }

        gameTable.appendChild(line);        
    }
}

const createMatrix = (row, col) => {
    const mat = [];
    for (let i = 0; i < row; i++) {
        const line = [];

        for (let j = 0; j < col; j++) {
            const tile = {};

            tile.type = Math.floor((Math.random() * TILE_OPTION_NUMBER) - 1);
            tile.row = i;
            tile.col = j;

            line.push(tile);
        }
        mat.push(line);

    }
    return mat;
}



state.worldMatrix = createMatrix(12, 16);

createWorld(state.worldMatrix);