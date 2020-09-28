export function permissionsToString(permissions) {
  let permissionsText = {
    view: "View",
    edit: "Edit",
    delete: "Delete",
    create: "Create",
  }
  let permissionsArr = []
  let { subscriptions, movies } = permissions;

  if (subscriptions.view) permissionsArr.push("View Subscriptions")
  if (subscriptions.edit) permissionsArr.push("Edit Subscriptions")
  if (subscriptions.delete) permissionsArr.push("Delete Subscriptions")
  if (subscriptions.create) permissionsArr.push("Create Subscriptions")
  if (movies.view) permissionsArr.push("View Movies")
  if (movies.edit) permissionsArr.push("Edit Movies")
  if (movies.delete) permissionsArr.push("Delete Movies")
  if (movies.create) permissionsArr.push("Create Movies")

  return permissionsArr.toString()

}

export function compareItemId(id) {
  return function compareId(item) {
    return item.id == id
  }
}

