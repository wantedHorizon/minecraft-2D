const TILE_OPTION_NUMBER = 6;
const TOOL_OPTION_NUMBER = 3;

const gameTable = document.querySelector('.game-area__game');
const lastMindedTileElement = document.querySelector('.tools-sidebar__lastMindedTile');
const tools = document.querySelectorAll('.tool');

const state = {
    gameStart: false,
    worldMatrix: [],
    selectedTool: -1, // 0-pickaxe => rock(4) , 1-shovel => dirt,dirt-grass(0,1), 2-axe => leaves,wood(2,3) 
    lastMindedTile: -1, //0-dirt , 1-dirt-grass , 2- leaves, 3- wood, 4-rock ,5-water
}

const updateLastMindedTIle = (type) => {
    state.lastMindedTile = type;
    lastMindedTileElement.dataset.type = type;
}
//validate tool can mine element
const validTool = (type, selectedTool) => {
    switch (selectedTool) {
        case 0: //p0-pickaxe => rock(4)i
            if (type == 4) return true;
            break;
        case 1: // 1-shovel => dirt,dirt-grass(0,1)
            if (type == 0 || type == 1) return true;
            break;
        case 2: // 2-axe => leaves,wood(2,3) 
            if (type == 2 || type == 3) return true;
            break;
        default:
            console.error("invalid tool number");
            break;

    }

    return false;
};

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

//adds warning after invalid tool press;
const toolwarning = () => {
    tools.forEach( t => {
        t.classList.add('warning');
        setTimeout((t)=> {t.classList.remove('warning')}, 1000);
    })
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
            toolwarning();
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
            lastMindedTileElement.dataset.type = -1;
        }
    }





}
//resets all active tools
const resetSelectedTools = () => {
    tools.forEach(t => {
        t.classList.remove('active');
    })
}

const toolOnClickHandler = (e) => {
    const tool = e.currentTarget;
    const toolType = parseInt(tool.dataset.tool);
    if (isNaN(toolType)) {
        console.error('invalid tool type');
        return;
    }
    resetSelectedTools();
    tool.classList.add('active');
    state.selectedTool = toolType;

}


const addEventsToTools = (toolOnClickHandler) => {
    tools.forEach(tool => {
        tool.addEventListener('click', toolOnClickHandler)
    })
}



//main
addEventsToTools(toolOnClickHandler);
state.worldMatrix = createMatrix(12, 16);

createWorld(state.worldMatrix, tileOnClickHandler);