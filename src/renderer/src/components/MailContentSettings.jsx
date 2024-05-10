import MailTitleInput from './MailTitleInput';
import Textarea from './Textarea';

const MailContentSettings = ({ onSave }) => {
  return (
    <div className="w-full flex flex-col h-full px-4 bg-4">
      <MailTitleInput />
      <Textarea onSave={onSave} />
    </div>
  );
};

export default MailContentSettings;
