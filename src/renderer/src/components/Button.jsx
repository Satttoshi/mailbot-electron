import Lottie from 'lottie-react';
import animationData from '../assets/lottiefiles/paper-plane';

const Button = ({ label, variant, onClick, className, type = 'button', loading, ...props }) => {
  const baseStyle = 'relative font-bold px-4 rounded focus:outline-none whitespace-nowrap';
  const variants = {
    green: `flex justify-center items-center py-0 w-[180px] h-[60px] bg-start z-10 text-dark transition-colors duration-300 ${loading ? 'bg-start-running cursor-not-allowed' : 'hover:bg-start-darken hover:text-white'}`,
    blue: 'py-2 bg-select hover:bg-select-darken text-white',
    red: 'py-2 bg-error hover:bg-error-darken text-white w-24 px-3'
  };

  const buttonStyle = `${baseStyle} ${variants[variant] || ''} ${className || ''}`;

  const content =
    loading && variant === 'green' ? (
      <div className="flex justify-center items-center h-full w-full overflow-hidden cursor-not-allowed">
        <Lottie animationData={animationData} height={128} width={128} />
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
