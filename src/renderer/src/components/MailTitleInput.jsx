import { useStore } from '../hooks/useStore';

const MailTitleInput = () => {
  const { mailTitle, setMailTitle } = useStore((state) => ({
    mailTitle: state.mailTitle,
    setMailTitle: state.setMailTitle
  }));
  const initialData = useStore((state) => state.initialData);

  const isChanging = mailTitle !== initialData.contentSettings.mailTitle;

  const handleTitleChange = (event) => {
    setMailTitle(event.target.value);
  };

  return (
    <div className="mb-2">
      <label htmlFor="mailTitle" className="text-white text-sm font-bold mb-2 flex justify-between">
        Title
        {isChanging && (
          <span className="text-error-lighten font-light italic">
            changes detected, save changes!
          </span>
        )}
      </label>
      <input
        type="text"
        id="mailTitle"
        name="mailTitle"
        value={mailTitle}
        onChange={handleTitleChange}
        className="mt-1 block w-full px-3 py-2 border border-grey rounded shadow-sm focus:outline-none focus:ring-select focus:border-select sm:text-sm"
        placeholder="Enter title here"
      />
    </div>
  );
};

export default MailTitleInput;
