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
