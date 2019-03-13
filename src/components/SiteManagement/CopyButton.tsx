import React from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconButton } from "@material-ui/core";
import { FileCopyOutlined } from "@material-ui/icons";

export default (props: { text: string }) => {
  return (
    <CopyToClipboard text={props.text}>
      <IconButton style={{ padding: 8, fontSize: 16 }}>
        <FileCopyOutlined fontSize="inherit" />
      </IconButton>
    </CopyToClipboard>
  );
};
