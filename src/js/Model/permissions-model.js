var permissions = [
    {
      id: 1,
      userId: 3,
      permissions: {
        subscriptions: {
          view: false,
          edit: false,
          delete: false,
          create: false
        }, movies: {
          view: true,
          edit: false,
          delete: false,
          create: false
        }
      }
    },
    {
      id: 2,
      userId: 1,
      permissions: {
        subscriptions: {
          view: true,
          edit: true,
          delete: true,
          create: false
        }, movies: {
          view: true,
          edit: true,
          delete: false,
          create: false
        }
      }
    }]

export async function getPermissions() {
    return new Promise((resolve, reject)=>{
        setTimeout(function resolveWithPermissions(){
        resolve(permissions)
        }, 0)
    })
}