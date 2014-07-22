/*global TrelloClone, JST */
TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  events: {
    "sortupdate .listContainer": "resort",
    "sortstart .listContainer" : "start"
  },
  
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
  
  makeSortable: function () {
    $(".listContainer").sortable();
    $(".cards").sortable({
      connectWith: ".cards"
    });
  },
  
  render: function () {
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    
    this.renderListSubView();
    this.renderNewListSubView();
    
    this.makeSortable();
    
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
  },
  
  resort: function (event, ui) {
    if ($(event.target).prop("class").indexOf("list") !== -1) {
      this.resortList(event, ui);
    } else {
      this.resortCard(event, ui);
    }
  },
  
  getCard: function (id) {
    var lists = this.model.lists().models;
    for (var i = 0; i < lists.length; i++) {
      var card = lists[i].cards().get(id);
      
      if (card !== undefined) {
        return card;
      }
    }
  },
  
  resortCard: function (event, ui) {
    if (event.target === ui.item.parent()[0]) {
      var lists = this.model.lists();
      var newListId = $(ui.item).parents(".list").data("listid");
      var newList = lists.get(newListId);
      
      var $card = $(ui.item);
      var oldListId = $card.data("listid");
      var oldList = lists.get(oldListId);
      
      var cardId = $card.data("cardid");
      var card = oldList.cards().get(cardId);
      
      var $list = $card.parent();
      var newIndex = $list.children(".card").index($card);
      
      oldList.cards().remove(card);
      newList.cards().add(card, {
        at: newIndex
      });
      
      newList.cards().models.forEach(function (card, index) {
        card.save({
          "ord": index,
          "list_id": newListId
        });
      });
    }
  },
  
  resortList: function (event, ui) {
    var lists = this.model.lists();
    $(".list").each(function (index) {
      var listId = $(this).data("listid");
      var list = lists.get(listId);
      
      list.save({
        "ord": index
      });
    });
  },
  
  start: function (event, ui) {
    var $card = $(ui.item);
    if ($card.prop("class").indexOf("card") !== -1) {
      var listId = $card.parents(".list").data("listid");
      
      $card.data("listid", listId);
    }
  }
});