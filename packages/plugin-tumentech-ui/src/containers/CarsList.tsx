import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { Bulk, Alert, withProps, router } from '@erxes/ui/src';
import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { IRouterProps } from '@erxes/ui/src/types';
import CarsList from '../components/list/CarsList';
import { mutations, queries } from '../graphql';
import {
  IProductCategory,
  ListConfigQueryResponse,
  ListQueryVariables,
  MainQueryResponse,
  MergeMutationResponse,
  MergeMutationVariables,
  ProductCategoriesQueryResponse,
  RemoveMutationResponse,
  RemoveMutationVariables
} from '../types';

type Props = {
  queryParams: any;
  history: any;
  productCategories: IProductCategory[];
  product?: IProductCategory;
};

type FinalProps = {
  carsMainQuery: MainQueryResponse;
  productCategoriesQuery: ProductCategoriesQueryResponse;
  carsListConfigQuery: ListConfigQueryResponse;
} & Props &
  IRouterProps &
  RemoveMutationResponse &
  MergeMutationResponse;

type State = {
  loading: boolean;
};

class CarListContainer extends React.Component<FinalProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const {
      carsMainQuery,
      carsRemove,
      carsMerge,
      history,
      productCategoriesQuery,
      carsListConfigQuery
    } = this.props;

    let columnsConfig = (carsListConfigQuery &&
      carsListConfigQuery.fieldsDefaultColumnsConfig) || [
      { name: 'plateNumber', label: 'Plate number', order: 1 },
      { name: 'vinNumber', label: 'Vin number', order: 2 },
      { name: 'vintageYear', label: 'Vintage year', order: 3 },
      { name: 'importYear', label: 'Import year', order: 4 },
      { name: 'description', label: 'Description', order: 5 }
    ];

    // load config from local storage
    const localConfig = localStorage.getItem(
      `erxes_tumentech:cars_columns_config`
    );

    if (localConfig) {
      columnsConfig = JSON.parse(localConfig).filter(conf => {
        return conf && conf.checked;
      });
    }

    if (productCategoriesQuery.loading) {
      return null;
    }

    const removeCars = ({ carIds }, emptyBulk) => {
      carsRemove({
        variables: { carIds }
      })
        .then(() => {
          emptyBulk();
          Alert.success('You successfully deleted a car');
        })
        .catch(e => {
          Alert.error(e.message);
        });
    };

    const mergeCars = ({ ids, data, callback }) => {
      carsMerge({
        variables: {
          carIds: ids,
          carFields: data
        }
      })
        .then(response => {
          Alert.success('You successfully merged cars');
          callback();
          history.push(
            `/erxes-plugin-car/details/${response.data.carsMerge._id}`
          );
        })
        .catch(e => {
          Alert.error(e.message);
        });
    };

    const searchValue = this.props.queryParams.searchValue || '';
    const { list = [], totalCount = 0 } = carsMainQuery.carsMain || {};

    const productCategories = productCategoriesQuery.productCategories || [];

    const updatedProps = {
      ...this.props,
      totalCount,
      searchValue,
      cars: list,
      loading: carsMainQuery.loading || this.state.loading,
      removeCars,
      mergeCars,
      productCategories,
      columnsConfig
    };

    const carsList = props => {
      return <CarsList {...updatedProps} {...props} />;
    };

    const refetch = () => {
      this.props.carsMainQuery.refetch();
    };

    return <Bulk content={carsList} refetch={refetch} />;
  }
}

const generateParams = ({ queryParams }) => ({
  variables: {
    ...router.generatePaginationParams(queryParams || {}),
    ids: queryParams.ids,
    categoryId: queryParams.categoryId,
    searchValue: queryParams.searchValue,
    sortField: queryParams.sortField,
    sortDirection: queryParams.sortDirection
      ? parseInt(queryParams.sortDirection, 10)
      : undefined
  },
  fetchPolicy: 'network-only'
});

const generateOptions = () => ({
  refetchQueries: [
    'carsMain',
    'carCounts',
    'carCategories',
    'carCategoriesTotalCount',
    'productCategories',
    'productCategoriesTotalCount',
    'products'
  ]
});

export default withProps<Props>(
  compose(
    graphql<Props, ListConfigQueryResponse, {}>(gql(queries.carsListConfig), {
      name: 'carsListConfigQuery'
    }),
    graphql<{ queryParams: any }, MainQueryResponse, ListQueryVariables>(
      gql(queries.carsMain),
      {
        // name: 'carsMainQuery',
        // options: generateParams

        name: 'carsMainQuery',
        options: ({ queryParams }) => ({
          variables: generateParams({ queryParams })
        })
      }
    ),
    // mutations
    graphql<{}, RemoveMutationResponse, RemoveMutationVariables>(
      gql(mutations.carsRemove),
      {
        name: 'carsRemove',
        options: generateOptions
      }
    ),
    graphql<{}, MergeMutationResponse, MergeMutationVariables>(
      gql(mutations.carsMerge),
      {
        name: 'carsMerge',
        options: generateOptions
      }
    ),
    graphql<Props, ProductCategoriesQueryResponse>(
      gql(queries.productCategories),
      {
        name: 'productCategoriesQuery'
      }
    )
  )(withRouter<IRouterProps>(CarListContainer))
);
