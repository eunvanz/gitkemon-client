import { useCallback, useMemo } from "react";
import { XIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { useDropzone } from "react-dropzone";
import { colors } from "~/constants/styles";
import { getCalculatedClassName } from "~/helpers/tailwindHelpers";
import { ExtendableHTMLProps } from "~/types";

export interface FileInputProps extends ExtendableHTMLProps<HTMLInputElement> {
  label?: string;
  hint?: string;
  maxFiles?: number;
  defaultFiles?: File[];
  selectedFiles?: File[];
  onSelectFiles: (files: File[]) => void;
  onDeleteFile: (index: number) => void;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  id,
  name,
  className,
  hint,
  accept,
  maxFiles = 0,
  multiple,
  selectedFiles = [],
  defaultFiles,
  onSelectFiles,
  onDeleteFile,
  ...restProps
}) => {
  const innerId = useMemo(() => {
    return id || name;
  }, [id, name]);

  const innerMultiple = useMemo(() => {
    return multiple || maxFiles === 0 || maxFiles > 1;
  }, [maxFiles, multiple]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      onSelectFiles(acceptedFiles);
    },
    [onSelectFiles],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    multiple: maxFiles === 0 || maxFiles > 1,
  });

  return (
    <div className={className}>
      <label
        htmlFor={innerId}
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {label}
      </label>
      {(maxFiles === 0 || selectedFiles.length < maxFiles) && (
        <div className="mt-1">
          <div
            className="max-full sm:max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            {...getRootProps()}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm justify-center text-gray-600">
                <label
                  htmlFor={innerId}
                  className={`relative cursor-pointer bg-white rounded-md font-medium text-${getCalculatedClassName(
                    colors.PRIMARY_COLOR,
                    100,
                  )} hover:text-${colors.PRIMARY_COLOR} focus-within:outline-none`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Upload a file</span>
                  <input
                    id={innerId}
                    name={name}
                    type="file"
                    className="sr-only"
                    multiple={innerMultiple}
                    {...restProps}
                    {...getInputProps()}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              {hint && <p className="text-xs text-gray-500">{hint}</p>}
            </div>
          </div>
        </div>
      )}
      {!!selectedFiles.length && (
        <div className="mt-1">
          {selectedFiles.map((file, index) => {
            return (
              <div
                key={index}
                className={cx(
                  "inline-block relative w-24 h-24 p-1 border border-gray-300 rounded-md text-right",
                  {
                    "mr-1": index < selectedFiles.length,
                  },
                )}
                style={{
                  background: `url(${URL.createObjectURL(
                    file,
                  )}) no-repeat center center/cover`,
                }}
              >
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => onDeleteFile(index)}
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileInput;
