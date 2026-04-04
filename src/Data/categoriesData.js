export const CATEGORY_IDS = {
  ALL: 'all',
  CONFIG_3D: '3d_config',
  VIEWERS_360: '360_viewers',
  WEBSITES: 'websites',
};

export const getCategories = (t) => [
  { id: CATEGORY_IDS.ALL,         label: t("all_projects")     || "Todos"             },
  { id: CATEGORY_IDS.CONFIG_3D,   label: t("3d_configurators") || "Configuradores 3D" },
  { id: CATEGORY_IDS.VIEWERS_360, label: t("360_viewers")      || "Visores 360"       },
  { id: CATEGORY_IDS.WEBSITES,    label: t("websites")         || "Sitios Web"        },
];