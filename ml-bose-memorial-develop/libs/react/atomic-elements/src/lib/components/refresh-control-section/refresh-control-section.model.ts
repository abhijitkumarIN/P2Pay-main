export interface RefreshControlSectionProps {
  actions?: Action[];
  attributes: Attribute[];
  entityActions?: any[];
  description?: string;
  entity?: string;
  title?: string;
  showActions: boolean;
  showAvatar: boolean;
  showDesc: boolean;
  showTitle: boolean;
  taskName: string;
}

export interface Action {
  type: string;
  label?: string;
}

export interface Attribute {
  name: string;
  type?: string;
}
