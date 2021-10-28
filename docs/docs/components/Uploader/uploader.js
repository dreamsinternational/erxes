import React from "react";
import Uploader from "erxes-ui/lib/components/Uploader";
import CodeBlock from "@theme/CodeBlock";
import { renderApiTable, stringify } from "../common.js";

export function UploaderComponent(props) {
const { singl, multi, lmt, type, table=[] } = props;
  
const propDatas = (single, multiple, limit) => {
  const datas = {
    single : singl,
    multiple: multi,
    limit: lmt,
  };

  return datas;
};

const renderBlock = (single, multiple, limit) => {
  return(
    <>
    <Uploader {...propDatas(single, multiple, limit)} />
    <CodeBlock className="language-jsx">
          {`<>\n\t<Uploader ${stringify(
            propDatas(single, multiple, limit)
          )} />\n</>`}
        </CodeBlock>
    </>
  );
};

if (type === "APIuploader"){
  return renderApiTable("Uploader", table);
};

return renderBlock("single", "multiple", "limit");
}