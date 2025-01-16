import { Property } from '../Table/Table.types';

export interface SidebarProps {
  open: boolean;
  handleClose: () => void;
  createProperty: (property: {
    variables: {
      city?: string;
      street?: string;
      state?: string;
      zipCode?: string;
    };
  }) => void;
}

export type PropertyFormErrors = Pick<
  Property,
  'city' | 'street' | 'state' | 'zipCode'
>;

export const US_STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];
