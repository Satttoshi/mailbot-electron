import { useStore } from '../hooks/useStore';

const Selector = () => {
  const mailNames = useStore((state) => state.mailNames);
  const selectedMailIndex = useStore((state) => state.selectedMailIndex);
  const setSelectedMailIndex = useStore((state) => state.setSelectedMailIndex);

  const handleChange = (event) => {
    setSelectedMailIndex(parseInt(event.target.value, 10));
  };

  return (
    <div className="flex flex-row py-2 px-4 bg-4 items-center justify-center rounded flex-wrap">
      <label className="font-medium text-white whitespace-nowrap">Sending from:</label>
      <select
        className="form-select text-center appearance-none block w-full my-1 px-2 py-1 text-base font-medium text-dark bg-white bg-clip-padding bg-no-repeat border border-solid border-grey rounded transition ease-in-out focus:text-grey focus:bg-white focus:border-select focus:outline-none hover:cursor-pointer hover:bg-lightgrey"
        value={selectedMailIndex}
        onChange={handleChange}
      >
        {mailNames.map((element, index) => (
          <option key={index} value={index}>
            {element}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
