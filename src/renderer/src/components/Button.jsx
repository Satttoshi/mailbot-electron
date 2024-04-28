import Lottie from 'react-lottie';
import animationData from '../assets/lottiefiles/paper-plane';

const Button = ({ label, variant, onClick, className, type = 'button', loading, ...props }) => {
  const baseStyle = 'relative font-bold px-4 rounded focus:outline-none whitespace-nowrap';
  const variants = {
    green: `flex justify-center items-center py-0 w-[180px] h-[60px] bg-green-500 z-10 text-white ${loading ? 'bg-green-600 cursor-not-allowed' : 'hover:bg-green-700'}`,
    dynamicBorder: `py-2 border-2 ${props.selected === props.index ? 'border-blue-500 bg-purple-950 text-white' : 'text-white border-gray-300 bg-purple-900'} hover:bg-purple-950 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`,
    blue: 'py-2 bg-blue-500 hover:bg-blue-700 text-white',
    red: 'py-2 bg-red-500 hover:bg-red-700 text-white w-24 px-3'
  };

  const buttonStyle = `${baseStyle} ${variants[variant] || ''} ${className || ''}`;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
    cursor: 'not-allowed'
  };

  const content =
    loading && variant === 'green' ? (
      <div
        className={`flex justify-center items-center h-full w-full overflow-hidden cursor-not-allowed`}
      >
        <Lottie
          style={{ cursor: 'not-allowed' }}
          options={defaultOptions}
          height={128}
          width={128}
        />
      </div>
    ) : (
      label
    );

  return (
    <button type={type} className={buttonStyle} onClick={onClick} disabled={loading} {...props}>
      {content}
    </button>
  );
};

export default Button;
