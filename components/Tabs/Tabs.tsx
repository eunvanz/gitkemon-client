import cx from "classnames";

export interface TabLabel {
  name: string;
  count?: number;
}

export interface TabsProps {
  activeIndex: number;
  labels: TabLabel[];
  onChange: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ labels, activeIndex, onChange }) => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 sm:text-sm rounded-md"
          defaultValue={activeIndex}
          onChange={(e) => onChange(Number(e.target.value))}
        >
          {labels.map((label, index) => (
            <option key={label.name} value={index}>
              {label.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {labels.map((label, index) => (
              <a
                key={label.name}
                onClick={() => onChange(index)}
                className={cx(
                  index === activeIndex
                    ? "border-blue-500 text-blue-600 border-b-2"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                  "whitespace-nowrap flex py-4 px-1 hover:border-b-2 font-medium text-sm",
                )}
                aria-current={index === activeIndex ? "page" : undefined}
              >
                {label.name}
                {label.count ? (
                  <span
                    className={cx(
                      index === activeIndex
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-900",
                      "hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block",
                    )}
                  >
                    {label.count}
                  </span>
                ) : null}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
