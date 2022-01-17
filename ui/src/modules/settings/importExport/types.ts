import { IUser } from 'modules/auth/types';
import { QueryResponse } from 'modules/common/types';

export interface IImportHistory {
  _id: string;
  success: string;
  updated: string;
  failed: string;
  total: string;
  contentTypes: string;
  date: Date;
  user: IUser;
  status: string;
  percentage: number;
  errorMsgs: string[];
}

export interface IImportHistoryItem {
  list: IImportHistory[];
  count: number;
}

export interface IImportHistoryContentType {
  type: 'core' | 'plugin';
  contentType: string;
  pluginType?: string;
}
// query types

export type ImportHistoriesQueryResponse = {
  importHistories: IImportHistoryItem;
  stopPolling: () => any;
} & QueryResponse;

export type ImportHistoryDetailQueryResponse = {
  importHistoryDetail: IImportHistory;
  subscribeToMore: any;
  error: any;
  stopPolling: () => any;
} & QueryResponse;

// mutation types

export type RemoveMutationResponse = {
  importHistoriesRemove: (params: {
    variables: { _id: string; contentType: string };
  }) => Promise<any>;
};

export type CancelMutationResponse = {
  importCancel: (params: { variables: { _id: string } }) => Promise<any>;
};