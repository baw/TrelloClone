/*global TrelloClone, JST */
TrelloClone.Views.CardView = Backbone.View.extend({
  template: JST["cards/_card"],
  
  initialize: function () {
    console.log("card init");
    console.log(this.model);
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderContent = this.template({
      card: this.model
    });
    
    this.$el.html(renderContent);
    
    return this;
  }
});