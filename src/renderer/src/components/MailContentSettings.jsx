import MailTitleInput from './MailTitleInput';
import Textarea from './Textarea';

const MailContentSettings = ({ onSave }) => {
  return (
    <div className="px-8 py-4 mb-4 bg-purple-900 shadow-md rounded">
      <MailTitleInput />
      <Textarea onSave={onSave} />
    </div>
  );
};

export default MailContentSettings;
