var SummaryView = Backbone.View.extend({
  el: ".js-summary",

  initialize: function(){
    this.listenTo(this.collection, 'reset', this.updateSummary)
  },

  updateSummary: function(){
    var url = window.location.pathname;
    var self = this;
    $.ajax({
      url: url + ".json",
      success: function(response){
        response["query"]["amount"] = response["query"]["amount"].replace(">|", "");
        delete response["query"]["page"];
        for(key in response["query"]){
          // console.log(response["query"][key]);
          element = document.querySelector("." + key);
          element.innerText = response["query"][key];
        }
      },
      error: function(response){
        alert("Unable to access database")
      } 
    });
    this.getStats();
  },

  getStats: function(){
    $(".total").text(" " + this.collection.sum("amount"));
    $(".top-state").text(" " + this.collection.topState());
    $(".top-state-total").text(" " + this.collection.stateMax());
    $(".top-contributors").html(this.getTopContributors());
  },

  getTopContributors: function(){
    var contributorTotals = this.collection.sumByContributor();
    var html = "<tr><th>Contributor Name</th><th>Total</th></tr>";
    for(var i = 0; i < contributorTotals.length; i++){
      var name = "<td>" + contributorTotals[i].name + "</td>";
      var total = "<td>" + contributorTotals[i].total + "</td>";
      html +=  "<tr>" + name + total + "</tr>";
    }
    return html;
  },

})