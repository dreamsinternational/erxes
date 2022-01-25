import Box from '@erxes/ui/src/components/Box';
import EmptyState from '@erxes/ui/src/components/EmptyState';
import Icon from '@erxes/ui/src/components/Icon';
import ModalTrigger from '@erxes/ui/src/components/ModalTrigger';
import Spinner from '@erxes/ui/src/components/Spinner';
import { ButtonRelated } from '@erxes/ui/src/styles/main';
import { __, renderFullName } from '@erxes/ui/src/utils';
import GetConformity from '@erxes/ui-cards/src/conformity/containers/GetConformity';
import { SectionBodyItem } from '@erxes/ui/src/layout/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import CustomerChooser from '../containers/CustomerChooser';
import { queries } from '../graphql';
import { ICustomer } from '../types';

export type Props = {
  name: string;
  items: ICustomer[];
  mainType?: string;
  mainTypeId?: string;
  onSelect?: (customers: ICustomer[]) => void;
  actionSection?: any;
  title?: string;
};

function Component({
  name,
  items = [],
  mainType = '',
  mainTypeId = '',
  onSelect,
  actionSection,
  title = ''
}: Props) {
  const renderRelatedCustomerChooser = props => {
    return (
      <CustomerChooser
        {...props}
        data={{ name, customers: items, mainTypeId, mainType, isRelated: true }}
        onSelect={onSelect}
      />
    );
  };

  const relCustomerTrigger = (
    <ButtonRelated>
      <span>{__('See related customers..')}</span>
    </ButtonRelated>
  );

  const relQuickButtons = (
    <ModalTrigger
      title="Related Associate"
      trigger={relCustomerTrigger}
      size="lg"
      content={renderRelatedCustomerChooser}
    />
  );

  const renderActionSection = customer => {
    if (!actionSection) {
      return;
    }

    const ActionSection = actionSection;
    return <ActionSection customer={customer} isSmall={true} />;
  };

  const renderBody = (customersObj: ICustomer[]) => {
    if (!customersObj) {
      return <Spinner objective={true} />;
    }
    return (
      <div>
        {customersObj.map((customer, index) => (
          <SectionBodyItem key={index}>
            <Link to={`/contacts/details/${customer._id}`}>
              {renderFullName(customer)}
            </Link>
            {renderActionSection(customer)}
          </SectionBodyItem>
        ))}
        {customersObj.length === 0 && (
          <EmptyState icon="user-6" text="No customer" />
        )}
        {mainTypeId && mainType && relQuickButtons}
      </div>
    );
  };

  const customerChooser = props => {
    return (
      <CustomerChooser
        {...props}
        data={{ name, customers: items, mainTypeId, mainType }}
        onSelect={onSelect}
      />
    );
  };

  const extraButtons = (
    <ModalTrigger
      title="Associate"
      size="lg"
      trigger={
        <button>
          <Icon icon="plus-circle" />
        </button>
      }
      content={customerChooser}
    />
  );

  return (
    <Box
      title={__(`${title || 'Customers'}`)}
      extraButtons={extraButtons}
      isOpen={true}
      name="showCustomers"
    >
      {renderBody(items)}
    </Box>
  );
}

export type ICustomerSectionProps = {
  mainType?: string;
  mainTypeId?: string;
  isOpen?: boolean;
  customers?: ICustomer[];
  onSelect?: (datas: ICustomer[]) => void;
  actionSection?: any;
};

export default (props: ICustomerSectionProps) => {
  return (
    <GetConformity
      {...props}
      relType="customer"
      component={Component}
      queryName="customers"
      itemsQuery={queries.customers}
      alreadyItems={props.customers}
    />
  );
};
