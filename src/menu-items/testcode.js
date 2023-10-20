// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'test-code',
  title: "Test the Code",
  type: 'group',
  children: [
    {
      id: 'responses',
      title: 'Responses',
      type: 'item',
      url: "",
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'tests',
      title: 'Tests',
      type: 'item',
      url: "",
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'generate-readme',
      title: 'Generate Readme',
      type: 'item',
      url: "",
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: "download-scripts",
      title: 'Dowmload Scripts',
      type: 'item',
      url: "",
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },

  ]
};

export default other;
