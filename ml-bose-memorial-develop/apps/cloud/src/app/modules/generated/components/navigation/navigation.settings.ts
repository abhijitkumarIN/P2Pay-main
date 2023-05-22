import { NavigationSettings } from './navigation.model';

export const getSettings = (logout: () => void): NavigationSettings => {
  return {
    accountMenuOptions: [
      {
        title: 'User Preferences',
        path: '/profile/endUserPreferences/edit',
      },
      {
        title: 'Logout',
        path: '/logout',
        func: logout,
      },
    ],
    helpUrl: ``,
    logo: `assets/logo.png`,
    menuOptions: [
      {
        title: `Registration`,
        path: `/registration`,
        icon: `ks-navigation-udxLHMgGqsDTn3uwFZS75A`,
        type: `workflow`,
        openInNewTab: false,
        areYouSure: false,
      },
      {
        title: `Find A Doctor`,
        path: `/find-a-doctor`,
        icon: `ks-navigation-6Rncjxzo62LhnqmgWbgtHG`,
        type: `workflow`,
        openInNewTab: false,
        areYouSure: false,
      },
    ],
  };
};
