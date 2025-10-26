import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
});

const useInfoTab = () => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorUpdateInfo },
    setValue: setValueUpdateInfo,
    reset: resetUpadteInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  return {
    controlUpdateInfo,
    errorUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpadteInfo,
    setValueUpdateInfo,
  };
};

export default useInfoTab;
