/*global TrelloClone, JST */
TrelloClone.Views.ListView = Backbone.CompositeView.extend({
  template: JST["lists/_list"],
  className: "list",
  
  initialize: function (options) {
    this.boardId = options.boardId;
    
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.renderCards);
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
    this.renderCardNew();
    
    return this;
  },
  
  renderCards: function () {
    $(".cards").html("");
    _(this.model.cards().models).each(this.addCard.bind(this));
  },
  
  renderCardNew: function () {
    var newCard = new TrelloClone.Views.CardNew({
      list: this.model
    });
    
    this.addSubview(".newCard", newCard);
  }
});