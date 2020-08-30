
# Minecreaft 2D - 
## Pure  JS & HTML & CSS 


# State object

```
state = {
    worldMatrix: [rows][cols],
    startGame: on/off,
    selectedTool: {0-3},
    lastMindedTile: {0-5}; // will be improved to array


    

}
```

## METHODS: 
- createMatrix(row,col): 
    `given rows and cols creates the world matrix specific by user request`.

- createWorld(matrix):
``given custom matrix, returns randomized of 4 types of tiles,
{sky: 0, dirt: 1, tree: 2, rock: 3} 
each tile will get  onClick event listener. ``

- startGame() 
``when user start game , welcome screen disappear => createMatrix(rows,cols) =>createWorld(matrix) => startGame() => ``

* tile.onClick()
 ```
 not-sky: when tile is clicked checks for selectedTool===appropriate tool toolToTile()=>  tile display: none -> lastMindedTile update 

 sky: if minded  => fill new tile

```

* toolToTile(tile-type, tools) => true/false;

* changeTIleType(row,col, type )

# Page View

``` 
body {
    <div class="wrapper">
       <div class="navbar"><button class="reset">Reset Game</button></div>
        <div class="game-area">

            <div class="game-area__game">
              <div class"row"> 

            {<div 
                class="tile" 
                data-col="j"
                data-row="i"
                data-type="0-4"
            > 
            </div> 
            } * 
            </div>
            <div class="menu">
                <button class="menu__btn">Start Game</button>
            </div>

      

         </div>
        </div>


        <div class="tools-sidebar>
        * 3-tools 
        * last MindedT Tile
        </div>
     </div>
}
```

## Tile Object Description

 * data-set : 
     - data-row: location i
     - data-col : location j
     - data-type: { -1-sky, 0-dirt, 1-dirt grass, 2-leaves, 3- wood , 4-rock, 5-water }






