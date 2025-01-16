import { Property } from '../Table/Table.types';

export interface PropertyModalProps {
  open: boolean;
  handleClose: () => void;
  property: Property | null;
}
