var FormView = Backbone.View.extend({
  el: ".js-query-form",

  events: {
    'click #query-submit' : 'newSunAPIquery'
  },

  initialize: function(){
    if($("[name='map[query]']").val() !== ""){
      this.getMapData();
    }
  },

  getMapData: function(){
    var url = window.location.pathname;
    var self = this;
    $.ajax({
      url: url + ".json",
      success: function(response){
        var dataArray = [];
        for(var i = 0; i < response["results"].length; i++){
          dataArray.push(response["results"][i]);
        }        
        self.collection.reset(dataArray);
      },
      error: function(response){
        alert("Unable to access database")
      } 
    });
  },

  getQueryParams: function(){
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
    return queryParams;
  },

  newSunAPIquery: function(){
    var self = this;
    var queryParams = self.getQueryParams();
    $.ajax({
      url: "/data",
      data: {
        query: queryParams
      },
      success: function(response){
        var dataArray = [];
        console.log(response);
        for(var i = 0; i < response["results"].length; i++){
          dataArray.push(response["results"][i]);
        }        
        self.collection.reset(dataArray);
        $("[name='map[query]']").val(response["query"]);
      },
      error: function(response){
        alert("Unable to access database")
      } 
    });
  }

})