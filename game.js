var gameOfLife = {

  width: 25,
  height: 25, // width and height dimensions of the board
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

  },

  forEachCell: function (iteratorFunc) {
    for(var i=0; i<gameOfLife.width; i++) {
      for(var j=0; j<gameOfLife.height; j++) {
        var cell00 = document.getElementById(i + '-' + j);
        iteratorFunc(cell00, i, j);
      }
    }

  },

  setupBoardEvents: function() {

    var onCellClick = function () {
      if (this.dataset.status == 'dead') {
        this.className = 'alive';
        this.dataset.status = 'alive';
      } else {
        this.className = 'dead';
        this.dataset.status = 'dead';
      }
    };

    var onClearClick = function() {
      if(gameOfLife.stepInterval) {
        console.log(gameOfLife.stepInterval);
        clearInterval(gameOfLife.stepInterval)
        this.stepInterval = null;
      }
      gameOfLife.forEachCell(function(cell) {
      cell.className = 'dead';
      cell.dataset.status = 'dead';
    });
    };

    //Adding cells to the board
    window.board.addEventListener('click', (event) => onCellClick.call(event.target))
    //Step Button
    window.step_btn.addEventListener('click', e => this.step())
    //AutoPlay Button
    window.play_btn.addEventListener('click', e => this.enableAutoPlay())
    //Pause Button
    window.pause_btn.addEventListener('click', e => this.pause())
    //Clear Button
    window.clear_btn.addEventListener('click', e => onClearClick())
    //Randomize
    window.reset_btn.addEventListener('click', e => this.randomize())

  },

  randomize: function() {
    gameOfLife.forEachCell(function(cell) {
      var rand = Math.round(Math.random());
      if (rand === 0) {
        cell.className = 'dead';
        cell.dataset.status = 'dead';
      } else {
         cell.className = 'alive';
         cell.dataset.status = 'alive';
      }
    });
  },

  step: function () {
    var queue = [];
    gameOfLife.forEachCell(function(cell, i, j) {
      var counter = 0;
        for (var e=-1; e<2; e++) {
          for (var l=-1; l<2; l++) {
            var neighbor = document.getElementById((i+e) + '-' + (j+l));
            if (neighbor && neighbor !== cell) {
              if (neighbor.className === 'alive') {
              counter++
              }
            }
          }
        }

        if (counter === 3) {
          queue.push('alive');
        }
        else if (cell.className === 'alive' && counter === 2){
          queue.push('alive');
        }
        else {
          queue.push('dead');
        }
    })

    gameOfLife.forEachCell(function(cell) {
      var status = queue.shift();
      if (status === 'alive') {
        cell.className = 'alive';
        cell.dataset.status = 'alive';
      }
      else {
        cell.className = 'dead';
        cell.dataset.status = 'dead';
      }
    });
  },

  enableAutoPlay: function () {
    gameOfLife.stepInterval = setInterval(() => this.step(), 200)
  },

  pause : function(){
    console.log('paused');
    clearInterval(gameOfLife.stepInterval)
    gameOfLife.stepInterval = null;
  }
};

gameOfLife.createAndShowBoard();
