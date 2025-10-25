import { Tab, Tabs } from "@heroui/react";
import React from "react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
  const { dataCategory } = useDetailCategory();

  return (
    <Tabs aria-label="Options">
      <Tab key="icon" title="Icon">
        <IconTab currentIcon={dataCategory?.data?.icon} />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab dataCategory={dataCategory?.data} />
      </Tab>
    </Tabs>
  );
};

export default DetailCategory;
