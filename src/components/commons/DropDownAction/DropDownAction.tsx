import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";

interface PropsType {
  onPressButtonDetail: () => void;
  onPressButtonDelete: () => void;
}

const DropDownAction = (props: PropsType) => {
  const { onPressButtonDetail, onPressButtonDelete } = props;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="detail-event-button" onPress={onPressButtonDetail}>
          Detail
        </DropdownItem>
        <DropdownItem
          key="delete-event-button"
          className="text-danger-500"
          onPress={onPressButtonDelete}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownAction;
