import { ICategory } from "@/types/category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Textarea,
} from "@heroui/react";
import React from "react";

interface PropsType {
  dataCategory: ICategory;
}

const InfoTab = (props: PropsType) => {
  const { dataCategory } = props;

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Info</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this category
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
          <div className="flex flex-col gap-2">
            <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
              <Input
                type="text"
                className="mt-2"
                label="Name"
                labelPlacement="outside"
                variant="bordered"
                defaultValue={dataCategory?.name}
              />
            </Skeleton>
            <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
              <Textarea
                className="mt-2"
                label="Description"
                labelPlacement="outside"
                variant="bordered"
                defaultValue={dataCategory?.description}
              />
            </Skeleton>
          </div>

          <Button
            color="primary"
            className="disabled:bg-default-500 mt-2"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
