/*global TrelloClone, JST */
TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    
    this.renderSubView();
    
    return this;
  },
  
  renderSubView: function () {
    var view = this;
    _(this.model.lists().models).each(function (list) {
      var listView = new TrelloClone.Views.ListShow({
        model: list,
        boardId: view.model.id
      });
      listView.render();
      
      view.addSubview(".lists", listView);
    });
  }
});