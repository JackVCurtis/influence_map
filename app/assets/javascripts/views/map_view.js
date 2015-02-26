var MapView = Backbone.View.extend({
  el: ".js-map",

  initialize: function(){
    this.listenTo(this.collection, 'reset', this.colorMap)
  },

  colorMap: function(){
    var baseColor = "#0000ff";
    var stateTotals = this.collection.sumByState();
    var max = this.collection.stateMax();
    for(var i = 0; i < stateTotals.length; i++){
      var state = stateTotals[i][0];
      var sum = stateTotals[i][1];
      var repSum = stateTotals[i][2];
      var demSum = stateTotals[i][3];
      var repWeight = parseInt((repSum / max) * 150);
      var demWeight = parseInt((demSum / max) * 150);
      this.$("#"+state).css("fill", "rgb("+ (200 - demWeight) +", 0, "+ (200 - repWeight) +")");
    }
  }
});
