var FormView = Backbone.View.extend({
  el: ".js-query-form",

  events: {
    'click #query-submit' : 'querySunAPI'
  },

  getQueryParams: function(){
    console.log(this.$("#amount").val())
    var queryParams = {
      page: 1,
      per_page: parseInt(this.$("#per_page").val()),
      amount: ">|" + this.$("#amount").val(),
      contributor_ft: this.$("#contributor_ft").val(),
      cycle: this.$("#cycle").val(),
      seat: "federal:" + this.$("#seat").val(),
      for_against: this.$("#for_against").val()
    };
    for (var key in queryParams ){
      if (queryParams[key] == ""){ delete queryParams[key]; }
    }
    console.log(queryParams);
    return queryParams;
  },

  querySunAPI: function(){
    var self = this;
    var queryParams = self.getQueryParams();
    console.log(queryParams);
    $.ajax({
      url: "/data",
      data: {
        query: queryParams
      },
      success: function(response){
        console.log(response);
        for(var i = 0; i < response.length; i++){
          var dataArray = [];
          var data = new Data(response[i]);
          dataArray.push(data);
          self.collection.reset(dataArray);
        }        
      },
      error: function(response){
        alert("Unable to access database")
      } 
    });
  }

})