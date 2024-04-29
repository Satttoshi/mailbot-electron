import MailTitleInput from './MailTitleInput';
import Textarea from './Textarea';

const MailContentSettings = ({ onSave }) => {
  return (
    <div className="w-full flex flex-col h-full px-8 pt-10 pb-3 bg-purple-900 shadow-md rounded">
      <MailTitleInput />
      <Textarea onSave={onSave} />
    </div>
  );
};

export default MailContentSettings;
