import { useStore } from '../hooks/useStore';

async function readPrivateConfig() {
  const privateConfigJsonString = await window.api.readPrivateConfigFile();
  if (privateConfigJsonString) {
    try {
      return JSON.parse(privateConfigJsonString);
    } catch (error) {
      console.error('Error parsing the private config JSON:', error);
    }
  } else {
    console.error("No config found or the config couldn't be read.");
  }
}

async function getMailNames() {
  const privateConfig = await readPrivateConfig();
  return privateConfig.mailcredentials.map((credential) => credential.name);
}

export const loadMailNames = async () => {
  const mailNames = await getMailNames();
  console.log('mailNames:', mailNames);
  useStore.getState().setMailNames(mailNames);
};
