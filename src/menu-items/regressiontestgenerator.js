// assets
import { IconMessage, IconAddressBook } from '@tabler/icons';

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
    }
  ]
};

export default other;
