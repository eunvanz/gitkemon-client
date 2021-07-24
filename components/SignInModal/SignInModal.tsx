import { ComponentProps } from "react";
import BaseModal, { BaseModalProps } from "../BaseModal";

export interface SignInModalProps extends BaseModalProps {}

const SignInModal = ({ ...baseModalProps }: SignInModalProps) => {
  return (
    <BaseModal {...baseModalProps}>
      <button>Sign in with GITHUB</button>
    </BaseModal>
  );
};

export default SignInModal;
