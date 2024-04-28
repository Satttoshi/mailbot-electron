const Button = ({ label, variant, onClick, className, type = 'button', ...props }) => {
  const baseStyle = 'font-bold py-2 px-4 rounded focus:outline-none';
  const variants = {
    green: 'bg-green-500 hover:bg-green-700 text-neutral-900',
    dynamicBorder: `border-2 ${props.selected === props.index ? 'border-blue-500 bg-purple-950 text-white' : 'text-white border-gray-300 bg-purple-900'} hover:bg-purple-950 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`,
    blue: 'bg-blue-500 hover:bg-blue-700 text-white',
    red: 'bg-red-500 hover:bg-red-700 text-white w-24 py-1 px-3'
  };

  const buttonStyle = `${baseStyle} ${variants[variant] || ''} ${className || ''}`;

  return (
    <button type={type} className={buttonStyle} onClick={onClick} {...props}>
      {label}
    </button>
  );
};

export default Button;
