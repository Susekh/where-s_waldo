const Card = ({
  className,
  cover,
  children,
}: {
  children?: React.ReactNode;
  className: string;
  cover: React.ReactElement;
}) => {
  return (
    <div
      className={`overflow-hidden transition-all duration-500 hover:scale-105 group ${className}`}
    >
      <div className="relative overflow-hidden">
        {cover}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      {children}
    </div>
  );
};

export default Card;