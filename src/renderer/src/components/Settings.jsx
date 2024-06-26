import { useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';
import Button from './Button';
import ThemeSwitch from './ThemeSwitch';

function Settings() {
  const [formData, setFormData] = useState({
    mailcredentials: [{ name: '', email: '', password: '' }],
    min: '',
    max: ''
  });

  const runToast = useStore((state) => state.runToast);
  const setMailNames = useStore((state) => state.setMailNames);

  useEffect(() => {
    const fetchPrivateConfigJson = async () => {
      const privateConfigJsonString = await window.api.readPrivateConfigFile();
      if (privateConfigJsonString) {
        try {
          // Parse the JSON string into an object
          const configObject = JSON.parse(privateConfigJsonString);
          setMailNames(configObject.mailcredentials.map((credential) => credential.name));
          setFormData(configObject);
        } catch (error) {
          console.error('Error parsing the private config JSON:', error);
        }
      } else {
        console.error("No config found or the config couldn't be read.");
      }
    };

    fetchPrivateConfigJson().catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleMailCredentialsChange = (index, field, value) => {
    const updatedMailCredentials = formData.mailcredentials.map((credential, i) => {
      if (i === index) {
        return { ...credential, [field]: value };
      }
      return credential;
    });
    setFormData({ ...formData, mailcredentials: updatedMailCredentials });
  };

  const addMailCredential = () => {
    const newCredential = { name: '', email: '', password: '' };
    setFormData({ ...formData, mailcredentials: [...formData.mailcredentials, newCredential] });
  };

  const removeMailCredential = (index) => {
    const filteredCredentials = formData.mailcredentials.filter((_, i) => i !== index);
    setFormData({ ...formData, mailcredentials: filteredCredentials });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.electron.ipcRenderer.send('save-private-config-json', formData);
    console.log('Form data submitted:', formData);
    setMailNames(formData.mailcredentials.map((credential) => credential.name));
    runToast('Settings updated!');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <form className="w-full max-w-full bg-4 rounded p-4" onSubmit={handleSubmit}>
        <label className="block text-white text-sm font-bold mb-2">Sender Emails</label>
        {formData.mailcredentials.map((credential, index) => (
          <div key={index} className="mb-4">
            <div className="flex gap-4 mb-2">
              <input
                className="shadow appearance-none border rounded w-32 py-2 px-3 text-grey leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Name"
                value={credential.name}
                required
                onChange={(e) => handleMailCredentialsChange(index, 'name', e.target.value)}
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                value={credential.email}
                required
                onChange={(e) => handleMailCredentialsChange(index, 'email', e.target.value)}
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                value={credential.password}
                required
                onChange={(e) => handleMailCredentialsChange(index, 'password', e.target.value)}
              />
              <div className="flex">
                <Button label="Remove" variant="red" onClick={() => removeMailCredential(index)} />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center mb-4">
          <Button label="Add Sender Email" variant="blue" onClick={addMailCredential} />
        </div>
        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="min">
              Min:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey leading-tight focus:outline-none focus:shadow-outline"
              id="min"
              type="number"
              name="min"
              value={formData.min}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="max">
              Max:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey leading-tight focus:outline-none focus:shadow-outline"
              id="max"
              type="number"
              name="max"
              value={formData.max}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button variant="blue" label="Update Settings" type="submit" />
        </div>
      </form>
      <ThemeSwitch />
    </div>
  );
}

export default Settings;
