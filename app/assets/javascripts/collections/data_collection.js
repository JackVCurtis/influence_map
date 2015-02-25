var DataCollection = Backbone.Collection.extend({
  model: Data,

  sum: function(attr){
    var self = this;
    var sum = 0;
    for(var i = 0; i < self.length; i++){
      var num = parseInt(self.at(i).get(attr));
      if(num >= 1){
        sum += num;
      }
    }
    return sum;
  },

  sumWhere: function(attr, condition){
    var modelArray = this.where(condition);
    var sum = 0;
    for(var i = 0; i < modelArray.length; i++){
      var num = parseInt(modelArray[i].get(attr));
      sum += num;
    }
    return sum;
  },
  //Returns total amount for each state where the amount is greater than 0
  sumByState: function(){
    var stateSums = [];
    for(var i = 0; i < statesArray.length; i++){
      var state = statesArray[i][0];
      var sum = this.sumWhere("amount", {recipient_state: state});
      var repSum = this.sumWhere("amount", {recipient_state: state, recipient_party: "R"})
      var demSum = this.sumWhere("amount", {recipient_state: state, recipient_party: "D"})
      if(sum != 0){ 
        stateSums.push([state, sum, repSum, demSum]);
      }
    }
    return stateSums;
  },

  stateMax: function(){
    var max = 0;
    var stateSums = this.sumByState();
    for(var i = 0; i < stateSums.length; i++){
      if(stateSums[i][1] > max){
        max = stateSums[i][1];
      }
    }
    return max;
  }

})