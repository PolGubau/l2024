interface ImageProps {
  image: string;
}

const LineImage = ({ image }: ImageProps) => {
  return (
    <img
      key={image}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
      src={image}
      alt={image}
      width={400}
      height={400}
      className="w-[400px] h-[400px] object-cover rounded-md"
    />
  );
};

export default LineImage;
