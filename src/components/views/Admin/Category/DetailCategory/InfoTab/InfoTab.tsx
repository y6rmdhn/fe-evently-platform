import { ICategory } from "@/types/category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import React, { useEffect } from "react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";

interface PropsType {
  dataCategory: ICategory;
  onUpdate: (data: ICategory) => void;
  isPendingUpdateCategory: boolean;
  isSuccessUpdateCategory: boolean;
}

const InfoTab = (props: PropsType) => {
  const {
    dataCategory,
    isPendingUpdateCategory,
    isSuccessUpdateCategory,
    onUpdate,
  } = props;

  const {
    controlUpdateInfo,
    errorUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpadteInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("name", `${dataCategory?.name}`);
    setValueUpdateInfo("description", `${dataCategory?.description}`);
  }, [dataCategory]);

  useEffect(() => {
    if (isSuccessUpdateCategory) {
      resetUpadteInfo();
    }
  }, [isSuccessUpdateCategory]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Info</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
              <Controller
                name="name"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="Name"
                    type="text"
                    isInvalid={!!errorUpdateInfo.name}
                    errorMessage={errorUpdateInfo.name?.message as string}
                    defaultValue={dataCategory?.name}
                    labelPlacement="outside"
                    className="mt-2"
                  />
                )}
              />
            </Skeleton>
            <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
              <Controller
                name="description"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    variant="bordered"
                    label="Description"
                    type="text"
                    isInvalid={!!errorUpdateInfo.description}
                    errorMessage={
                      errorUpdateInfo.description?.message as string
                    }
                    defaultValue={dataCategory?.description}
                    className="mt-2"
                    labelPlacement="outside"
                  />
                )}
              />
            </Skeleton>
          </div>

          <Button
            color="primary"
            className="disabled:bg-default-500 mt-2"
            type="submit"
            disabled={isPendingUpdateCategory || !dataCategory?._id}
          >
            {isPendingUpdateCategory ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
