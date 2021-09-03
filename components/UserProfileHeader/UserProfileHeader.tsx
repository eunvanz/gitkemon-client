import { useCallback, useEffect, useState } from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import ROUTES from "~/paths";
import { User, UserProfile } from "~/types";
import Button from "../Button";
import ControlledInput from "../ControlledInput";
import Input from "../Input";
import TrainerClassBadge from "../TrainerClassBadge";

export interface UserProfileFormValues {
  nickname: string;
  introduce: string;
}

export interface UserProfileHeaderProps {
  user?: User;
  userProfile?: UserProfile;
  onSubmit: (values: UserProfileFormValues) => void;
  isSubmitting: boolean;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  user,
  userProfile,
  onSubmit,
  isSubmitting,
}) => {
  const { control, handleSubmit, formState, setValue } = useForm<UserProfileFormValues>({
    defaultValues: {
      nickname: user?.nickname || "",
      introduce: user?.introduce || "",
    },
    mode: "onChange",
  });

  const [isEditing, setIsEditing] = useState(false);

  const submitForm = useCallback(() => {
    handleSubmit(async (formValues) => {
      onSubmit(formValues);
    })();
  }, [handleSubmit, onSubmit]);

  useEffect(() => {
    if (user) {
      setValue("nickname", user.nickname);
      setValue("introduce", user.introduce || "");
    }
  }, [setValue, user]);

  useEffect(() => {
    if (isSubmitting) {
      return () => {
        setIsEditing(false);
      };
    }
  }, [isSubmitting]);

  const router = useRouter();

  return (
    <div className="w-full mx-auto md:flex md:items-center md:justify-between md:space-x-5">
      <div className="flex items-center space-x-5">
        <div className="flex-shrink-0">
          <div className="relative">
            {userProfile ? (
              <>
                <Image
                  className="rounded-full"
                  src={userProfile.avatarUrl}
                  alt="user image"
                  width={64}
                  height={64}
                />
                <span
                  className="absolute inset-0 shadow-inner rounded-full"
                  aria-hidden="true"
                />
              </>
            ) : (
              <Skeleton style={{ width: "4rem", height: "4rem", borderRadius: "50%" }} />
            )}
          </div>
        </div>
        <div className="flex-1">
          {isEditing ? (
            <div className="flex flex-col w-full justify-start sm:flex-row sm:justify-start">
              <div className="flex-shrink-0 sm:w-40">
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
              <div className="flex-1 mt-2 sm:mt-0 sm:ml-4 sm:w-80">
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
          ) : userProfile ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-0 items-center flex">
                {userProfile.nickname}{" "}
                <TrainerClassBadge
                  className="ml-2"
                  trainerClass={userProfile.trainerClass}
                />
              </h1>
              <p className="text-sm font-medium text-gray-500 mb-0">
                {userProfile.githubLogin}{" "}
                {userProfile.introduce && `· ${userProfile.introduce}`}
              </p>
            </>
          ) : (
            <>
              <Skeleton style={{ display: "block", width: 200, height: 30 }} />
              <Skeleton style={{ display: "block", marginTop: 4, width: 150 }} />
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
        {userProfile && !isEditing && (
          <>
            {user?.id === userProfile?.id && (
              <Button color="white" onClick={() => setIsEditing(true)}>
                Edit profile
              </Button>
            )}
            <Button
              icon={<FontAwesomeIcon icon={faGithub} className="w-4 h-4 mr-2" />}
              color="white"
              onClick={() => window.open(userProfile.githubUrl)}
            >
              Github
            </Button>
            <Button
              color="white"
              onClick={() => router.push(`${ROUTES.COLLECTIONS}/${userProfile.id}`)}
            >
              Collection
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfileHeader;
