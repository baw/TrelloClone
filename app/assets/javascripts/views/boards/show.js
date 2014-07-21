/*global TrelloClone, JST */
TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addListSubView);
  },
  
  addListSubView: function (list) {
    var listView = new TrelloClone.Views.ListView({
      model: list,
      boardId: this.model.id
    });
    
    this.addSubview(".listContainer", listView);
  },
  
  render: function () {
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    
    this.renderListSubView();
    this.renderNewListSubView();
    
    return this;
  },
  
  renderListSubView: function () {
    var view = this;
    _(this.model.lists().models).each(function (list) {
      var listView = new TrelloClone.Views.ListView({
        model: list,
        boardId: view.model.id
      });
      
      view.addSubview(".listContainer", listView);
    });
  },
  
  renderNewListSubView: function () {
    var listNewView = new TrelloClone.Views.ListNew({
      model: this.model
    });
    
    this.addSubview(".listNew", listNewView);
  }
});