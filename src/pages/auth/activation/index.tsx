import AuthLayouts from "@/components/layouts/AuthLayout";
import ActivationAccount from "@/components/views/Auth/Activation";
import authServices from "@/services/auth.service";
import React from "react";

interface PropTypes {
  status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
  return (
    <AuthLayouts title="evently | Activation">
      <ActivationAccount {...props} />
    </AuthLayouts>
  );
};

export async function getServerSideProps(context: { query: { code: string } }) {
  try {
    const result = await authServices.activation({ code: context.query.code });

    console.log(result.data.data);

    if (result.data.data) {
      return {
        props: {
          status: "success",
        },
      };
    } else {
      return {
        props: {
          status: "failed",
        },
      };
    }
  } catch (error) {
    return {
      props: {
        status: "failed",
      },
    };
  }
}

export default Activation;
