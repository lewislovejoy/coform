import React from "react";
import {Flex} from "@radix-ui/themes";
import {UploadIcon} from "@radix-ui/react-icons";

export default function Header() {
  return (
    <Flex
      align="center"
      gap="1"
      direction="row"
      py="2"
      style={{borderBottom: '1px solid #dddddd'}}
    >
      <div className={"pl-5 pr-5"}>
        <UploadIcon/>
      </div>
      <div>
        Dashboard
      </div>
      <div className="ml-auto pr-5">
        <UploadIcon/>
      </div>
    </Flex>
  );
}
