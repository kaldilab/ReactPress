import React from 'react';
import { NavLink } from 'react-router-dom';
import Menus from 'settings/Menus';

export default function Navigation(props) {

  return (
    <React.Fragment>
      <ul className="navbar-nav mr-auto">
        {
          Menus.map((item, index) => {
            const isSubmenu = 'submenu' in item;
            const getSubmenu = (parentMenu, menuSlug, level) => {
              return (
                <ul className="nav-submenu">
                  {
                    parentMenu.submenu.map((item, index) => {
                      const isChildrenSubmenu = 'submenu' in item;
                      const joinPath = menuSlug + '/' + item.slug;
                      return (
                        (item.navigation)
                        &&
                        <li key={index} className={`nav-item menu-depth${level} menu-${item.slug} ${(isChildrenSubmenu) ? 'nav-item-has-children' : ''}`}>
                          <NavLink
                            to={{ pathname: joinPath }}
                            className="nav-link"
                            activeClassName="active"
                            target="_self"
                          >
                            {item.label}
                          </NavLink>
                          {
                            (isChildrenSubmenu) && getSubmenu(item, joinPath, level + 1)
                          }
                        </li>
                      )
                    })
                  }
                </ul>
              )
            }
            return (
              (item.navigation)
              &&
              <li key={index} className={`nav-item menu-depth1 menu-${item.slug} ${(isSubmenu) ? 'nav-item-has-children' : ''}`}>
                <NavLink
                  to={{ pathname: '/' + item.slug }}
                  className="nav-link"
                  activeClassName="active"
                  target="_self"
                >
                  {item.label}
                </NavLink>
                {
                  (isSubmenu) && getSubmenu(item, '/' + item.slug, 2)
                }
              </li>
            )
          })
        }
      </ul>
    </React.Fragment>
  )

}