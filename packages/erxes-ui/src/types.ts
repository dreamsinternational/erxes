import { IUser } from '@erxes/ui/src/auth/types';

export interface IRouterProps {
  history: any;
  location: any;
  match: any;
}

export interface IAttachment {
  name: string;
  type: string;
  url: string;
  size?: number;
  duration?: number;
}

export type IAttachmentPreview = {
  name: string;
  type: string;
  data: string;
} | null;

export interface IAnimatedLoader {
  height?: string;
  width?: string;
  color?: string;
  round?: boolean;
  margin?: string;
  marginRight?: string;
  isBox?: boolean;
  withImage?: boolean;
}

export interface IBreadCrumbItem {
  title: string;
  link?: string;
}

export interface ISubMenuItem {
  title: string;
  link?: string;
}

export interface IQueryParams {
  [key: string]: string;
}

export interface ISelectedOption {
  label: string;
  value: string;
}

export interface IConditionsRule {
  _id: string;
  kind?: string;
  text: string;
  condition: string;
  value: string;
}

export type IDateColumn = {
  month: number;
  year: number;
};

export interface IFieldLogic {
  fieldId?: string;
  tempFieldId?: string;
  logicOperator: string;
  logicValue: string;
  __typename?: string;
}

export interface IField {
  _id: string;
  key?: string;
  contentType: string;
  contentTypeId?: string;
  type: string;
  validation?: string;
  text?: string;
  content?: string;
  description?: string;
  options?: string[];
  isRequired?: boolean;
  order?: React.ReactNode;
  canHide?: boolean;
  isVisible?: boolean;
  isVisibleInDetail?: boolean;
  isDefinedByErxes?: boolean;
  groupId?: string;
  lastUpdatedUser?: IUser;
  lastUpdatedUserId?: string;
  associatedFieldId?: string;
  column?: number;
  associatedField?: {
    _id: string;
    text: string;
    contentType: string;
  };
  logics?: IFieldLogic[];
  logicAction?: string;
  groupName?: string;
  pageNumber?: number;
}

export interface IFormProps {
  errors: any;
  values: any;
  registerChild: (child: React.ReactNode) => void;
  runValidations?: (callback: any) => void;
  resetSubmit?: () => void;
  isSubmitted: boolean;
  isSaved?: boolean;
}

export type IOption = {
  label: string;
  value: string;
  avatar?: string;
};

export type IButtonMutateProps = {
  name?: string;
  values: any;
  isSubmitted: boolean;
  confirmationUpdate?: boolean;
  callback?: () => void;
  resetSubmit?: () => void;
  size?: string;
  object?: any;
  text?: string;
  icon?: string;
  type?: string;
  disableLoading?: boolean;
};

export type IMentionUser = {
  id: string;
  avatar: string;
  username: string;
  fullName?: string;
};

export type IEditorProps = {
  onCtrlEnter?: (evt?: any) => void;
  content: string;
  onChange: (evt: any) => void;
  height?: number | string;
  insertItems?: any;
  removeButtons?: string;
  removePlugins?: string;
  toolbarCanCollapse?: boolean;
  mentionUsers?: IMentionUser[];
  toolbar?: any[];
  autoFocus?: boolean;
  toolbarLocation?: 'top' | 'bottom';
  autoGrow?: boolean;
  autoGrowMinHeight?: number;
  autoGrowMaxHeight?: number;
  name?: string;
  isSubmitted?: boolean;
  formItems?: any;
};

export type QueryResponse = {
  loading: boolean;
  refetch: () => Promise<any>;
  error?: string;
};
