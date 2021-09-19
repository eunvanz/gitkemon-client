import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import ROUTES from "~/paths";
import { User } from "~/types";
import DropDownMenu from "../DropDownMenu";
import Typography from "../Typography";

export interface UserItemProps {
  user: User;
  isAvatarHidden?: boolean;
  isInline?: boolean;
  suffix?: React.ReactNode;
}

const UserItem: React.FC<UserItemProps> = ({
  user,
  isAvatarHidden,
  isInline,
  suffix,
}) => {
  const router = useRouter();

  return isInline ? (
    <span className="inline">
      <DropDownMenu
        buttonLabel={
          <>
            <Typography as="a" weight="bold">
              {user.nickname}
            </Typography>
            <Typography color="hint">({user.githubLogin})</Typography>
          </>
        }
        menuItems={[
          [
            {
              title: "Profile",
              onClick: () => router.push(`${ROUTES.PROFILE}/${user.id}`),
            },
            {
              title: "Collection",
              onClick: () => router.push(`${ROUTES.COLLECTIONS}/${user.id}`),
            },
          ],
        ]}
        width={32}
        origin="left"
        className="inline"
      />
    </span>
  ) : (
    <div className={cx("flex items-center")}>
      {!isAvatarHidden && !!user.githubUser && (
        <div className="flex-shrink-0 h-10 w-10">
          <Image
            className="h-10 w-10 rounded-full"
            width={40}
            height={40}
            src={user.githubUser!.avatar_url}
            alt="user image"
          />
        </div>
      )}
      <div className={cx(isAvatarHidden || !user.githubUser ? undefined : "ml-2")}>
        <DropDownMenu
          buttonLabel={
            <>
              <Typography as="a" weight="bold">
                {user.nickname}
              </Typography>
              {suffix}
            </>
          }
          menuItems={[
            [
              {
                title: "Profile",
                onClick: () => router.push(`${ROUTES.PROFILE}/${user.id}`),
              },
              {
                title: "Collection",
                onClick: () => router.push(`${ROUTES.COLLECTIONS}/${user.id}`),
              },
            ],
          ]}
          width={32}
          origin="left"
        />

        <div className="text-sm text-gray-500">{user.githubLogin}</div>
      </div>
    </div>
  );
};

export default UserItem;
