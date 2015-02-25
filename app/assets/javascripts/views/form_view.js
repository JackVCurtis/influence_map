var FormView = Backbone.View.extend({
  el: ".js-query-form",

  
  querySunAPI: function(){
    var self = this;
    $.ajax({
      url: "/data",
      data: {
        query: {
          page: 1,
          per_page: 1000,
          amount: "%3E%7C1000",
          contributor_ft: "wal-mart",
          cycle: "2012",
          seat: "federal%3Ahouse",
          for_against: "for"
        }
      },
      success: function(response){
        for(var i = 0; i < response.length; i++){
          var dataArray = [];
          var data = new Data(response[i]);
          dataArray.push(data);
          self.collection.add(dataArray);
        }        
      },
      error: function(response){
        alert("Could not find data")
      } 
    });
  }

})