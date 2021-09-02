import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { User, UserProfile } from "~/types";
import Button from "../Button";
import ControlledInput from "../ControlledInput";
import Input from "../Input";

export interface UserProfileFormValues {
  nickname: string;
  introduce: string;
}

export interface UserProfileHeaderProps {
  user: User;
  userProfile: UserProfile;
  onSubmit: (values: UserProfileFormValues) => void;
  isSubmitting: boolean;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  user,
  userProfile,
  onSubmit,
  isSubmitting,
}) => {
  const { control, handleSubmit, formState } = useForm<UserProfileFormValues>({
    defaultValues: {
      nickname: user.nickname,
      introduce: user.introduce || "",
    },
    mode: "onChange",
  });

  const [isEditing, setIsEditing] = useState(false);

  const submitForm = useCallback(() => {
    handleSubmit(async (formValues) => {
      onSubmit(formValues);
    })();
  }, [handleSubmit, onSubmit]);

  return (
    <div className="w-full mx-auto md:flex md:items-center md:justify-between md:space-x-5">
      <div className="flex items-center space-x-5">
        <div className="flex-shrink-0">
          <div className="relative">
            {/* eslint-disable-next-line */}
            <img
              className="h-16 w-16 rounded-full"
              src={userProfile.avatarUrl}
              alt="user image"
            />
            <span
              className="absolute inset-0 shadow-inner rounded-full"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="flex-1">
          {isEditing ? (
            <div className="flex flex-col w-full justify-start sm:flex-row sm:justify-start">
              <div className="flex-shrink-0">
                <ControlledInput
                  control={control}
                  name="nickname"
                  input={Input}
                  inputProps={{
                    label: "Nickname",
                    placeholder: "Nickname",
                    disabled: isSubmitting,
                  }}
                  rules={{
                    required: "Nickname is required",
                    maxLength: {
                      value: 20,
                      message: "Should be lower than 20 characters",
                    },
                  }}
                />
              </div>
              <div className="flex-1 mt-2 sm:mt-0 sm:ml-4">
                <ControlledInput
                  control={control}
                  name="introduce"
                  input={Input}
                  inputProps={{
                    label: "Introduce",
                    placeholder: "About your self",
                    disabled: isSubmitting,
                  }}
                  rules={{
                    maxLength: {
                      value: 80,
                      message: "Should be lower than 80 characters",
                    },
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-0">
                {userProfile.nickname}
              </h1>
              <p className="text-sm font-medium text-gray-500 mb-0">
                {userProfile.githubLogin}{" "}
                {userProfile.introduce && `· ${userProfile.introduce}`}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
        {isEditing && (
          <>
            <Button
              color="white"
              disabled={isSubmitting}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              disabled={!formState.isValid}
              isLoading={isSubmitting}
              onClick={submitForm}
            >
              Apply
            </Button>
          </>
        )}
        {!isEditing && user.id === userProfile.id && (
          <Button color="white" onClick={() => setIsEditing(true)}>
            Edit profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserProfileHeader;
