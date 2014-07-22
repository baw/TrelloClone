/*global TrelloClone, JST */
TrelloClone.Views.CardView = Backbone.View.extend({
  tagName: "ul",
  className: "card",
  template: JST["cards/_card"],
  
  events: {
    "click .deleteCard": "deleteCard"
  },
  
  deleteCard: function (event) {
    var card = this.model;
    card.destroy();
  },
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderContent = this.template({
      card: this.model
    });
    
    this.$el.html(renderContent);
    this.$el.data("cardid", this.model.escape("id"));
    
    return this;
  }
});