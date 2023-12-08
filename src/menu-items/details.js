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
      id: 'conversational',
      title: 'Conversational Details',
      type: 'item',
      url: '/conversational-details',
      icon: icons.IconMessage,
      breadcrumbs: false
    },
    {
      id: 'contact-us',
      title: 'Contact Us Details',
      type: 'item',
      url: '/contact-us-details',
      icon: icons.IconAddressBook,
      breadcrumbs: false
    }
  ]
};

export default other;
