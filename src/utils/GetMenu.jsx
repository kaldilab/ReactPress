import Menus from 'settings/Menus';

export function MenuLabel(routeSlug) {
  const getLabel = [];
  Menus.map(item => {
    const isSubmenu = 'submenu' in item;
    const getSubmenu = (parentMenu) => {
      parentMenu.submenu.map(item => {
        const isChildrenSubmenu = 'submenu' in item;
        return (
          (item.slug === routeSlug)
            ?
            getLabel.push(item.label)
            :
            (isChildrenSubmenu) && getSubmenu(item)
        )
      })
    };
    return (
      (item.slug === routeSlug)
        ?
        getLabel.push(item.label)
        :
        (isSubmenu) && getSubmenu(item)
    )
  });
  return getLabel[0];
}

export function MenuUrl(menuSlug) {
  const getMenu = [];
  Menus.map(item => {
    const parentItem = item;
    const isSubmenu = 'submenu' in item;
    const getSubmenu = (parentMenu) => {
      parentMenu.submenu.map((item, index) => {
        const isChildrenSubmenu = 'submenu' in item;
        return (
          (item.slug === menuSlug)
            ?
            getMenu.push(parentItem.slug, parentItem.submenu[index].slug)
            :
            (isChildrenSubmenu) && getSubmenu(item)
        )
      })
    };
    return (
      (item.slug === menuSlug)
        ?
        getMenu.push(parentItem.slug)
        :
        (isSubmenu) && getSubmenu(item)
    )
  });
  return '/' + getMenu.join('/');
}