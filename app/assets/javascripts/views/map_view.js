var MapView = Backbone.View.extend({
  el: ".js-map",

  initialize: function(){
    this.listenTo(this.collection, 'reset', this.colorMap)
  },

  colorMap: function(){
    var baseColor = "#0000ff";
    var stateTotals = this.collection.sumByState();
    var max = this.collection.stateMax();
    console.log(stateTotals, this.collection.sum("amount"));
    for(var i = 0; i < stateTotals.length; i++){
      var state = stateTotals[i][0];
      var sum = stateTotals[i][1];
      var colorWeight = parseInt((sum / max) * 150);
      console.log(colorWeight)
      this.$("#"+state).css("fill", "rgb(0, "+ (200 - colorWeight) +", 0)")
    }
  }

})
