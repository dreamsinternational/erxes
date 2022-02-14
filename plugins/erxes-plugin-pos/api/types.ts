export interface IPOS {
  name: string;
  description?: string;
  userId?: string;
  createdAt?: Date;
  integrationId?: string;
  brandId: string;
  tagIds?: string[];
  productDetails: string[];
  adminIds: string[];
  cashierIds: string[];
  isOnline?: boolean;
  branchId?: string;
  allowBranchIds?: string[];
  beginNumber?: string;
  maxSkipNumber?: number;
  kitchenScreen: any;
  waitingScreen: any;
  kioskMachine: any;
  uiOptions: any;
  formSectionTitle: string;
  formIntegrationIds: string[];
  ebarimtConfig: any;
  erkhetConfig: any;
  initialCategoryIds: string[];
  kioskExcludeProductIds: string[];
  catProdMappings?: any;
}
