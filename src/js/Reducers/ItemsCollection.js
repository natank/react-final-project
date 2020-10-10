export default class ItemsCollection {
  constructor(items) {
    this.items = items
  }
  addItem(newItem) {
    this.items = [...this.items, newItem]
    return this.items;
  }

  removeItem(id) {
    return this.items.filter(item => item.id != id)
  }

  updateItem(updatedItem) {
    this.items = this.items.filter(item => item.id != updatedItem.id)
    this.items.push(updatedItem)
    return this.items;
  }

  loadItems(items) {
    return items;
  }

  createItem() {

  }
}