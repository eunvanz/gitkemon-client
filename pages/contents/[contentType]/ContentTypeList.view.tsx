import { useMemo } from "react";
import ContentsTableContainer from "~/components/ContentsTable";
import Typography from "~/components/Typography";
import { ContentType } from "~/types";

export interface ContentTypeListProps {
  contentType: ContentType;
}

const ContentTypeList: React.FC<ContentTypeListProps> = ({ contentType }) => {
  const title = useMemo(() => {
    switch (contentType) {
      case "notice":
        return "Notices";
    }
  }, [contentType]);

  return (
    <div className="content-container-no-footer max-w-screen-xl m-auto p-1 sm:p-4">
      <Typography as="h1" size="2xl">
        {title}
      </Typography>
      <ContentsTableContainer contentType={contentType} />
    </div>
  );
};

export default ContentTypeList;
