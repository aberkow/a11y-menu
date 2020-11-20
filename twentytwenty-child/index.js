document.addEventListener('DOMContentLoaded', () => {

  const navigation = new Navigation({
    menus: [
      {
        menuId: 'am-main-menu',
        click: true
      },
      {
        menuId: 'am-secondary-menu',
        click: true
      }
    ]
  })

  navigation.init()



  // const navigation = new Navigation({
  //   menuId: 'am-main-menu',
  //   click: true
  // })
  // navigation.init()

  // if (document.getElementById('am-secondary-nav')) {
  //   const secondaryNavigation = new Navigation({
  //     menuId: 'am-secondary-menu',
  //     click: true
  //   })
  //   secondaryNavigation.init()
  // }
})