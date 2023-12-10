// assets
import { IconMessage, IconAddressBook } from '@tabler/icons';
import ApiIcon from '@mui/icons-material/Api';
// constant
const icons = { IconMessage, IconAddressBook };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  title: 'Details',
  type: 'group',
  children: [
    {
      id: 'regression-test-generator',
      title: 'Conversational Details',
      type: 'item',
      url: '/conversational-page',
      icon: icons.IconMessage,
      breadcrumbs: false
    },
    {
      id: 'contact-us-page',
      title: 'Contact Us Details',
      type: 'item',
      url: '/contact-us-page',
      icon: icons.IconAddressBook,
      breadcrumbs: false
    },
    {
      id: 'api-status',
      title: 'API Status Details',
      type: 'item',
      url: '/api-status-page',
      icon: ApiIcon,
      breadcrumbs: false
    }
  ]
};

export default other;
