import MailContentSettings from '../components/MailContentSettings';
import { useIPCEvents } from '../hooks/useIPCEvents';

const ContentSettings = () => {
  const { writeMailContentToTxt } = useIPCEvents();

  return <MailContentSettings onSave={writeMailContentToTxt} />;
};

export default ContentSettings;
