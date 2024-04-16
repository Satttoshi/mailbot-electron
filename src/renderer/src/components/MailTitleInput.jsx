import { useStore } from '../hooks/useStore';

const MailTitleInput = () => {
  const { mailTitle, setMailTitle } = useStore((state) => ({
    mailTitle: state.mailTitle,
    setMailTitle: state.setMailTitle
  }));

  const handleTitleChange = (event) => {
    setMailTitle(event.target.value);
  };

  return (
    <div className="mb-2">
      <label htmlFor="mailTitle" className="block text-white text-sm font-bold mb-2">
        Title for your Mail
      </label>
      <input
        type="text"
        id="mailTitle"
        name="mailTitle"
        value={mailTitle}
        onChange={handleTitleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Enter title here"
      />
    </div>
  );
};

export default MailTitleInput;
