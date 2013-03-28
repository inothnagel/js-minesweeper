Grid = {
  width: 9,
  height: 9,
  numberOfMines: 9,

  setup: function(){
    this.initTiles();
    this.layRandomMines();
    this.calculateTileMineTotals();
  },

  initTiles: function(){
    this.tiles = []
    for(i=0; i<Grid.width; i++) {
      this.tiles[i] = []
      for(j=0; j<Grid.height; j++) {
        this.tiles[i][j] = {mine: false}
      }
    }
  },

  layRandomMines: function(){
    var minesLaid = 0
    while (minesLaid < Grid.numberOfMines) {
      var x = Math.floor(Math.random()*Grid.width);
      var y = Math.floor(Math.random()*Grid.height);
      if (!Grid.tiles[x][y].mine){
        Grid.tiles[x][y].mine = true;
        minesLaid++;
      }
    }
  },

  calculateTileMineTotals: function(){
    for(i=0; i<this.width; i++) {
      for(j=0; j<this.height; j++) {
        this.tiles[i][j].minesTotal = this.calculateTileMinesTotal(i,j);
      }
    }
  },

  calculateTileMinesTotal: function(x, y){
    var total=0;
    for(var i=(x-1); i<=(x+1); i++){
      for(var j=(y-1); j<=(y+1); j++){
        if (i>=0 && j>=0 && i<this.width && j<this.height){
          if (this.tiles[i][j].mine==true){
            total++;
          }
        }
      }
    }
    return total;
  },

  draw: function(){
    $('#Grid').html('');
    $('#Grid').css('width', 22 * this.width);
    $('#Grid').css('margin', 'auto');

    for(i=0; i<this.width; i++){
      for(j=0; j<this.height; j++){
        var id = "tile-" + i + "-" + j;
        var tile = this.tiles[i][j];

        $('#Grid').append('<div class="tile" id="' + id + '" ></div>')
        if (tile.mine == true) {
          $('#' + id).addClass('mine');
        }
        if (tile.minesTotal > 0 && tile.mine == false){
          $('#' + id).append(tile.minesTotal);
        }
      }
      $('#Grid').append('<div style="clear:both;"></div>')
    }
  }
}
