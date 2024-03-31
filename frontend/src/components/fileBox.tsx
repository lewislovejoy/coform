import {Flex, Spinner} from "@radix-ui/themes";
import {DotsHorizontalIcon, SymbolIcon, UploadIcon} from "@radix-ui/react-icons";
import React from "react";

export interface FileDef {
  filename: string;
  fileType: 'PDF' | 'TXT'
  status: 'Added' | 'Loaded' | 'Processing' | 'Error',
  file?: File
}

const FILE_ICONS = {
  PDF: <UploadIcon/>,
  TXT: <UploadIcon/>
}

const FILE_STATUS = {
  Added: <span style={{ fontSize: 12 }}>Unprocessed</span>,
  Error: <span style={{ fontSize: 12 }}>Error</span>,
  Processing: <Spinner />,
  Loaded: <DotsHorizontalIcon/>
}

export default function FileBox({file}: { file: FileDef}) {
  const { filename, fileType, status } = file;
  return (
      <Flex
        align="center"
        gap="1"
        direction="row"
        py="2"
        className="rounded-lg mt-2"
        style={{ backgroundColor: '#f4f5fb' }}
      >
        <div className={"pl-5 pr-5"}>
          {FILE_ICONS[fileType]}
        </div>
        <div>
          {filename}
        </div>
        <div className="ml-auto pr-5">
          {FILE_STATUS[status]}
        </div>
      </Flex>
  );
}
