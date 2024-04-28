import { useStore } from '../hooks/useStore';
import Button from './Button';

const Selector = () => {
  const mailNames = useStore((state) => state.mailNames);
  const selectedMailIndex = useStore((state) => state.selectedMailIndex);
  const setSelectedMailIndex = useStore((state) => state.setSelectedMailIndex);

  return (
    <div className="flex flex-row gap-4 items-center justify-center py-4 flex-wrap">
      {mailNames.map((element, index) => (
        <Button
          key={index}
          label={element}
          variant="dynamicBorder"
          onClick={() => setSelectedMailIndex(index)}
        />
      ))}
    </div>
  );
};

export default Selector;
