var MapView = Backbone.View.extend({
  el: ".js-map",

  events: {
    "change #color-toggle" : "colorMap"
  },

  initialize: function(){
    this.listenTo(this.collection, 'reset', this.colorMap)
  },

  colorMap: function(){
    this.$(".state").css("fill", "#E0E0E0")

    if(this.$("#color-toggle").is(":checked")){
      this.$(".btn").text("Show Total Contributions")
      this.colorPartisanship();
    }
    else {
      this.$(".btn").text("Show Party Contributions")
      this.colorSpending();
    }
  },

  colorPartisanship: function(){
    var stateTotals = this.collection.sumByState();
    for(var i = 0; i < stateTotals.length; i++){
      var state = stateTotals[i][0];
      var repSum = stateTotals[i][2];
      var demSum = stateTotals[i][3];
      var partisanSum = repSum + demSum;
      var repWeight = parseInt((repSum / partisanSum) * 200);
      var demWeight = parseInt((demSum / partisanSum) * 200);
      this.$("#"+state).css("fill", "rgb("+ (200 - demWeight) +", 0, "+ (200 - repWeight) +")");
    }
  },

  colorSpending: function(){
    var stateTotals = this.collection.sumByState();
    var max = this.collection.stateMax();
    for(var i = 0; i < stateTotals.length; i++){
      var state = stateTotals[i][0];
      var sum = stateTotals[i][1];
      var colorWeight = parseInt((sum / max) * 200);
      this.$("#"+state).css("fill", "rgb(0, "+ (200 - colorWeight) +", 0)");
    }
  }
});
