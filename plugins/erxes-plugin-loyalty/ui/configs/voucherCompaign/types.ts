import { ICommonTypes } from "../commonTypes";

export type IVoucherCompaign = ICommonTypes & {
  score?: number,
  scoreAction?: string,

  productCategoryIds?: string[],
  productIds?: string[],
  productDiscountPercent?: number,
  productLimit?: boolean,
  productCount?: number,

  spinCompaignId?: string,
  spinCount?: number,

  lotteryCompaignId?: string,
  lotteryCount?: number,
};

// query types
export type VoucherCompaignQueryResponse = {
  voucherCompaigns: IVoucherCompaign[];
  loading: boolean;
  refetch: () => void;
};

export type VoucherCompaignRemoveMutationResponse = {
  voucherCompaignsRemove: (mutation: {
    variables: { _ids: string[] };
  }) => Promise<any>;
}