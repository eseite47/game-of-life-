var gameOfLife = {
  
  width: 12, 
  height: 12, // width and height dimensions of the board
  stepInterval: null, // should be used to hold reference to an interval that is "playing" the game

  createAndShowBoard: function () {
    
    // create <table> element
    var goltable = document.createElement("tbody");
    
    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;
    
    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);
    
    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
    this.clearing();
  },

  forEachCell: function (iteratorFunc) {
    /* 
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
    */
    for(var i=0; i<gameOfLife.width; i++) {
      for(var j=0; j<gameOfLife.height; j++) {
        var cell00 = document.getElementById(i + '-' + j);
        iteratorFunc(cell00);
      }
    }

  },
  
  setupBoardEvents: function() {
    // each board cell has an CSS id in the format of: "x-y" 
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "click" events that allow a user to click on 
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"
    
    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white
    
    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board
    
    var onCellClick = function () {
      console.log(this);
      // QUESTION TO ASK YOURSELF: What is "this" equal to here?
      // how to set the style of the cell when it's clicked
      if (this.dataset.status == 'dead') {
        this.className = 'alive';
        this.dataset.status = 'alive';
      } else {
        this.className = 'dead';
        this.dataset.status = 'dead';
      } 
    };

    var onClearClick = function() {
      forEachCell(function(cell) {
      cell.className = 'dead';
      cell.dataset.status = 'dead'; 
    });
      
    }

    for(var i=0; i<gameOfLife.width; i++) {
      for(var j=0; j<gameOfLife.height; j++) {
        var cell00 = document.getElementById(i + '-' + j);
        cell00.addEventListener('click', onCellClick);
        
      }
    }

    

    
    
  },



clearing: function() {
  var clearingFunc = function() {
     forEachCell(function(cell) {
      cell.className = 'dead';
      cell.dataset.status = 'dead'; 
    });

  }

  var clear_bt = document.getElementById('clear_btn');
  clear_bt.addEventListener('click', this.clearing);
   
   
  },

  
  

  

  randomize: function() {
    forEachCell(function(cell) {
      var rand = Math.round(Math.random());
      if(rand === 0) {
        cell.className = 'dead';
        cell.dataset.status = 'dead';
      } else {
         cell.className = 'alive';
         cell.dataset.status = 'alive';
      }
    });
  },




  step: function () {
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game. 
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells based on their alive neighbors
    
    for(var i=0; i<gameOfLife.width; i++) {
      for(var j=0; j<gameOfLife.height; j++) {
        var counter = 0;
        var cell00 = document.getElementById(i + '-' + j);

        for(var e=-1; e<2; e++) {
          for(var l=-1; l<2; l++) {
            var neighbor = document.getElementById((i+e) + '-' + (j+l));
            if(neighbor.className === 'alive') {
              counter++
            }
          }
        }
        
        if(counter === 3) {
          cell00.className === 'alive';
          this.dataset.status = 'alive';
        }
        else {
          cell00.className === 'dead';
          this.dataset.status = 'dead';
        }

        // cell00.addEventListener('click', onCellClick);
      }
    }


  },

  enableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval  
  }
  
};






gameOfLife.createAndShowBoard();
