import ContentEditor from "~/components/ContentEditor";
import ContentViewer, { ContentViewerProps } from "~/components/ContentViewer";
import Footer from "~/components/Footer";
import { Content, ContentType } from "~/types";

export interface ContentDetailProps extends Omit<ContentViewerProps, "content"> {
  contentType: ContentType;
  content?: Content;
  isEditMode?: boolean;
  onSubmitContent: (formValues: {
    type: ContentType;
    body: string;
    title: string;
  }) => void;
  isSubmittingContent: boolean;
  onNavigateBack: VoidFunction;
}

const ContentDetail: React.FC<ContentDetailProps> = ({
  contentType,
  content,
  isEditMode,
  onSubmitContent,
  isSubmittingContent,
  onNavigateBack,
  ...restProps
}) => {
  return (
    <div className="content-container max-w-screen-xl m-auto p-1 sm:p-4">
      {content && !isEditMode ? (
        <ContentViewer content={content} {...restProps} />
      ) : (
        <div>
          <ContentEditor
            type={contentType}
            content={content}
            onSubmit={onSubmitContent}
            isSubmitting={isSubmittingContent}
            onCancel={onNavigateBack}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ContentDetail;
