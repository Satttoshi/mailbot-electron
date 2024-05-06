import MailContentSettings from '../components/MailContentSettings';
import PageWrapper from '../components/PageWrapper';

const ContentSettings = ({ writeMailContentToTxt }) => {
  return (
    <PageWrapper>
      <MailContentSettings onSave={writeMailContentToTxt} />
    </PageWrapper>
  );
};

export default ContentSettings;
