import Button from 'modules/common/components/Button';
import { Step, Steps } from '@erxes/ui/src/components/stepper';
import {
  ControlWrapper,
  Indicator,
  StepWrapper
} from 'modules/common/components/step/styles';
import { __ } from 'modules/common/utils';
import Wrapper from 'modules/layout/components/Wrapper';
import React from 'react';
import { Link } from 'react-router-dom';
import FileUpload from './FileUpload';

import Details from './Details';
import TypeForm from '../containers/TypeForm';
import AccociateForm from '../containers/AccociateForm';
import MapColumn from '../containers/MapColumn';
import { IImportHistoryContentType } from '../../types';
import {
  Content,
  LeftContent
} from '@erxes/ui-settings/src/integrations/styles';
import { StepperWrapper, StepperItem, StepCounter } from "@erxes/ui/src/components/stepper"
import BreadCrumb from "@erxes/ui/src/components/breadcrumb/NewBreadCrumb";

type Props = {
  contentType: string;
  addImportHistory: (doc: any) => void;
};

type State = {
  attachments: any;

  columnWithChosenField: any;
  importName: string;
  disclaimer: boolean;
  type: string;
  contentTypes: IImportHistoryContentType[];

  associatedField: string;
  associatedContentType: string;

  current: number;
  // content: any;
};

class Form extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      attachments: {},
      columnWithChosenField: {},
      importName: '',
      disclaimer: false,
      type: 'single',
      contentTypes: [],
      associatedField: '',
      associatedContentType: '',
      current: 1,
      // content:
    };
  }

  onChangeAttachment = (files, contentType) => {
    const { attachments } = this.state;

    const temp = { ...attachments };

    if (files[0]) {
      temp[contentType] = files;
    }

    this.setState({ attachments: temp });
  };

  onChangeColumn = (column, value, contentType) => {
    const { columnWithChosenField } = this.state;

    const temp = columnWithChosenField[contentType] || {};

    temp[column] = {};
    temp[column].value = value;

    const temp2 = columnWithChosenField || {};

    temp2[contentType] = temp;

    this.setState({ columnWithChosenField: temp2 });
  };

  onChangeImportName = value => {
    this.setState({ importName: value });
  };

  onChangeDisclaimer = value => {
    this.setState({ disclaimer: value });
  };

  onChangeType = value => {
    this.setState({ type: value, contentTypes: [] });
  };

  onChangeAssociateHeader = value => {
    this.setState({ associatedField: value });
  };

  onChangeAssociateContentType = value => {
    this.setState({ associatedContentType: value });
  };

  onChangeContentType = (contentType: IImportHistoryContentType) => {
    const { type, contentTypes } = this.state;

    if (type === 'single') {
      return this.setState({ contentTypes: [contentType] });
    }

    let temp: IImportHistoryContentType[] = [];

    if (contentTypes.length === 2) {
      temp = [...contentTypes];

      temp[0] = contentTypes[1];

      temp[1] = contentType;

      return this.setState({ contentTypes: temp });
    }

    temp = [...contentTypes];

    temp.push(contentType);

    return this.setState({ contentTypes: temp });
  };

  onSubmit = () => {
    const {
      importName,
      columnWithChosenField,
      attachments,
      contentTypes,
      associatedField,
      associatedContentType
    } = this.state;

    const files = [] as any;

    for (const contentType of contentTypes) {
      if (attachments[contentType.contentType]) {
        const attachment = attachments[contentType.contentType];

        files.push(attachment[0]);
      }
    }

    const doc = {
      contentTypes,
      importName,
      files: attachments,
      columnsConfig: columnWithChosenField,
      associatedField,
      associatedContentType
    };

    return this.props.addImportHistory(doc);
  };

  renderImportButton = () => {
    const { disclaimer, importName } = this.state;
    if (disclaimer && importName) {
      return (
        <Button btnStyle="success" onClick={this.onSubmit}>
          Import
        </Button>
      );
    }

    return null;
  };

  renderAssociateForm = () => {
    if (this.state.type === 'multi') {
      const { attachments, contentTypes } = this.state;
      const attachmentNames: string[] = [];

      for (const contentType of contentTypes) {
        if (attachments[contentType.contentType]) {
          const attachment = attachments[contentType.contentType];

          attachmentNames.push(attachment[0].url);
        }
      }

      return (
        <Step title="Accociate">
          <AccociateForm
            attachmentNames={attachmentNames}
            contentTypes={contentTypes}
            onChangeAssociateHeader={this.onChangeAssociateHeader}
            onChangeAssociateContentType={this.onChangeAssociateContentType}
          />
        </Step>
      );
    }

    return;
  };

  renderMapColumn = () => {
    const { contentTypes, attachments, columnWithChosenField } = this.state;

    const result = [] as any;

    for (const contentType of contentTypes) {
      if (attachments[contentType.contentType]) {
        const attachment = attachments[contentType.contentType];

        result.push(
          <Step
            title={`Mapping  `}
            key={Math.random()}
          >
            <MapColumn
              contentType={contentType.contentType}
              serviceType={contentType.serviceType}
              attachments={attachment}
              columnWithChosenField={columnWithChosenField}
              onChangeColumn={this.onChangeColumn}
            />
          </Step>
        );
      }
    }

    return result;
  };

  render() {
    const { importName, disclaimer, type, contentTypes, current } = this.state;
    
    // const onClick ;
    const title = __('Import');

    const breadcrumb = [
      { title: __('Settings'), link: '/settings' },
      { title: __('Import & Export'), link: '/settings/importHistories' },
      { title }
    ];

    const content = (
        <Content>
          <LeftContent>
            <Steps active={1} allStep={3} titles={["Type", "Upload", "Detail"]}>
              <Step title="Type">
                <TypeForm
                  type={type}
                  onChangeContentType={this.onChangeContentType}
                  contentTypes={contentTypes}
                />
                <div>hohohoho</div>
              </Step>
              <Step title="Upload">
                {/* <FileUpload
                  onChangeAttachment={this.onChangeAttachment}
                  contentTypes={contentTypes}
                  type={type}
                /> */}
                <div>nknknknk</div>
              </Step>

              {/* {this.renderAssociateForm()} */}
              {this.renderMapColumn()}

              <Step
                title="Detail"
              >
                <Details
                  disclaimer={disclaimer}
                  importName={importName}
                  onChangeImportName={this.onChangeImportName}
                  onChangeDisclaimer={this.onChangeDisclaimer}
                />
                {/* <div>loolo</div> */}
              </Step>
            </Steps>

            <ControlWrapper>
              <Indicator />
              <Button.Group>
                <Link to="settings/importHistories">
                  <Button btnStyle="simple" icon="times-circle">
                    Cancel
                  </Button>
                </Link>

                {this.renderImportButton()}
              </Button.Group>
            </ControlWrapper>
          </LeftContent>
        </Content>
    )

    return (
        <Wrapper mainHead={<BreadCrumb breadcrumbs={breadcrumb} />} content={content} />
    );
  }
}

export default Form;
