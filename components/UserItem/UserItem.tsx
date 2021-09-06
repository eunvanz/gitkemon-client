import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import ROUTES from "~/paths";
import { User } from "~/types";
import Typography from "../Typography";

export interface UserItemProps {
  user: User;
  isAvatarHidden?: boolean;
}

const UserItem: React.FC<UserItemProps> = ({ user, isAvatarHidden }) => {
  const router = useRouter();

  return (
    <div className="flex items-center">
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
      <div className={cx(isAvatarHidden ? undefined : "ml-4")}>
        <Typography
          as="a"
          weight="bold"
          onClick={() => router.push(`${ROUTES.PROFILE}/${user.id}`)}
        >
          {user.nickname}
        </Typography>
        <div className="text-sm text-gray-500">{user.githubLogin}</div>
      </div>
    </div>
  );
};

export default UserItem;
