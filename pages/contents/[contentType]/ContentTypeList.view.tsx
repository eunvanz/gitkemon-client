import { useMemo } from "react";
import { UploadIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Button from "~/components/Button";
import ContentsTableContainer from "~/components/ContentsTable";
import Typography from "~/components/Typography";
import { checkIsAdminUser } from "~/helpers/projectHelpers";
import ROUTES from "~/paths";
import { ContentType, User } from "~/types";

export interface ContentTypeListProps {
  contentType: ContentType;
  user?: User;
}

const ContentTypeList: React.FC<ContentTypeListProps> = ({ contentType, user }) => {
  const title = useMemo(() => {
    switch (contentType) {
      case "notice":
        return "Notices";
      case "tip":
        return "Tips";
    }
  }, [contentType]);

  const router = useRouter();

  const promotionMessage = useMemo(() => {
    switch (contentType) {
      case "notice":
        return "If you are not administrator, you can't see this.";
      case "tip":
        return "Upload postings if you have any idea to share.";
    }
  }, [contentType]);

  const isUploadVisible = useMemo(() => {
    if (contentType === "notice") {
      return user && checkIsAdminUser(user);
    } else {
      return true;
    }
  }, [contentType, user]);

  return (
    <div className="content-container-no-footer max-w-screen-xl m-auto p-1 sm:p-4">
      <Typography as="h1" size="2xl">
        {title}
      </Typography>
      {isUploadVisible && (
        <div className="sticky top-0 z-10 border-b mb-2">
          <div className="flex justify-between items-center p-2 bg-white">
            <Typography as="div">{promotionMessage}</Typography>
            <Button
              icon={UploadIcon}
              className="ml-2"
              size="xs"
              color="primary"
              onClick={() => router.push(`${ROUTES.CONTENTS}/${contentType}/new`)}
            >
              Upload
            </Button>
          </div>
        </div>
      )}
      <ContentsTableContainer contentType={contentType} />
    </div>
  );
};

export default ContentTypeList;
