/*global TrelloClone, JST */
TrelloClone.Views.ListView = Backbone.CompositeView.extend({
  template: JST["lists/_list"],
  className: "list",
  
  initialize: function (options) {
    this.boardId = options.boardId;
    
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
  },
  
  addCard: function (newCard) {
    var cardView = new TrelloClone.Views.CardView({
      model: newCard
    });
    
    this.addSubview(".cards", cardView);
  },
  
  render: function () {
    var renderContent = this.template({
      list: this.model,
      boardId: this.boardId
    });
    
    this.$el.html(renderContent);
    this.renderCards();
    
    return this;
  },
  
  renderCards: function () {
    console.log("render cards");
    var view = this;
    _(view.model.cards().models).each(this.addCard.bind(this));
    console.log("finished render cards");
  }
});