import { useCallback } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import useUserProfileMutation from "~/queries/useUserProfileMutation";
import useUserProfileQuery from "~/queries/useUserProfileQuery";
import { userState } from "~/state/user";
import { UserProfileFormValues, UserProfileHeaderProps } from "./UserProfileHeader";

const useUserProfileHeaderProps: () => UserProfileHeaderProps = () => {
  const user = useRecoilValue(userState);

  const router = useRouter();

  const { userId } = router.query as { userId: string };

  const { data: userProfile } = useUserProfileQuery(userId);

  const { mutate: updateProfile, isLoading: isSubmitting } = useUserProfileMutation();

  const onSubmit = useCallback(
    (formValues: UserProfileFormValues) => {
      updateProfile(formValues);
    },
    [updateProfile],
  );

  return {
    isSubmitting,
    onSubmit,
    userProfile,
    user,
  };
};

export default useUserProfileHeaderProps;
