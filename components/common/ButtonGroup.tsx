interface Button {
  id: string;
  label: string;
}

interface Props {
  buttons: Button[];
  activeButton: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const activeButtonStyles =
  "text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800";
const inactiveButtonStyles =
  "text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800";

const ButtonGroup: React.FC<Props> = ({ buttons, activeButton, onClick }) => {
  return (
    <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={onClick}
          type="button"
          id={button.id}
          className={`${
            activeButton === button.id
              ? activeButtonStyles
              : inactiveButtonStyles
          }`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
