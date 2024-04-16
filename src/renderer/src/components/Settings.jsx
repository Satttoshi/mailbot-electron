import { useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';

function Settings() {
  const [formData, setFormData] = useState({
    spreadsheet_id: '',
    credentials: '',
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
          // Ensure that the 'credentials' property is kept as a JSON string for your form
          // If 'credentials' is an object, stringify it; otherwise, use it as is or default to an empty string
          const credentials =
            typeof configObject.credentials === 'object'
              ? JSON.stringify(configObject.credentials, null, 2)
              : configObject.credentials || '';
          // Update the form data, ensuring credentials is a string
          setFormData({ ...configObject, credentials });
          // Update the mail names in the global store
          setMailNames(configObject.mailcredentials.map((credential) => credential.name));
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
    <div className="flex flex-col items-center justify-center mt-4">
      <form
        className="w-full max-w-full bg-purple-900 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="spreadsheet_id">
            Spreadsheet ID:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="spreadsheet_id"
            type="text"
            name="spreadsheet_id"
            value={formData.spreadsheet_id}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="credentials">
            Credentials (JSON String):
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="credentials"
            name="credentials"
            value={formData.credentials}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <label className="block text-white text-sm font-bold mb-2">Sender Emails</label>
        {formData.mailcredentials.map((credential, index) => (
          <div key={index} className="mb-4">
            <div className="flex gap-4 mb-2">
              <input
                className="shadow appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Name"
                value={credential.name}
                required
                onChange={(e) => handleMailCredentialsChange(index, 'name', e.target.value)}
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                value={credential.email}
                required
                onChange={(e) => handleMailCredentialsChange(index, 'email', e.target.value)}
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                value={credential.password}
                required
                onChange={(e) => handleMailCredentialsChange(index, 'password', e.target.value)}
              />
              <div className="flex">
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold w-24 py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => removeMailCredential(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center mb-4">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={addMailCredential}
          >
            Add Another Email
          </button>
        </div>
        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="min">
              Min:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="max"
              type="number"
              name="max"
              value={formData.max}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
