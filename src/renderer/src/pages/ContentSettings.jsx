import MailContentSettings from '../components/MailContentSettings';
import PageWrapper from '../components/PageWrapper';

const ContentSettings = ({ onSave }) => {
  return (
    <PageWrapper>
      <MailContentSettings onSave={onSave} />
    </PageWrapper>
  );
};

export default ContentSettings;
