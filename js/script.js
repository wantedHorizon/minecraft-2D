const TILE_OPTION_NUMBER = 7
const gameTable = document.querySelector('.game-area__game');

const state = {
    gameStart: false,
    worldMatrix: [],
    selectedTool: -1, //0-2
    lastMindedTile: -1, //0-5
}
const updateLastMindedTIle = (type) => {
    state.lastMindedTile = type;
    console.log("lastmindedtile:" + state.lastMindedTile);
}
const validTool = () => true;

const createWorld = (mat, tileOnClickHandler) => {

    for (let i = 0; i < mat.length; i++) {
        const line = document.createElement('div');
        line.classList.add('row');

        for (let j = 0; j < mat[i].length; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');

            //adding datasets
            for (const [key, value] of Object.entries(mat[i][j])) {
                tile.dataset[key] = value;
            }
            //adding events
            tile.addEventListener('click', tileOnClickHandler);
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

const tileOnClickHandler = (e) => {
    console.log(e.currentTarget.dataset.type);
    const tile = e.currentTarget;
    let type = parseInt(tile.dataset.type);

    //check inputs 
    if (isNaN(type)) {
        console.error('invalid type');
        return;
    }




    if (type >= 0) { //mine tile

        if (!validTool(type, state.selectedTool)) {
            console.error('invalid tool');
            return;

        }

        tileStateObject = state.worldMatrix[tile.dataset.row][tile.dataset.col];
        if (!tileStateObject) {
            return;
        }
        tileStateObject.type = -1;
        tile.dataset.type = -1;
        updateLastMindedTIle(type);





    } else if (type == -1) { // plant tile
        if (state.lastMindedTile >= 0) {
            tile.dataset.type = state.lastMindedTile;
            state.lastMindedTile = -1;
        }
    }

    console.log(state);




}

state.worldMatrix = createMatrix(12, 16);

createWorld(state.worldMatrix, tileOnClickHandler);