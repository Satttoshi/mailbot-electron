import MailContentSettings from '../components/MailContentSettings';

const ContentSettings = ({ writeMailContentToTxt }) => {
  return <MailContentSettings onSave={writeMailContentToTxt} />;
};

export default ContentSettings;
