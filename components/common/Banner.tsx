import { FC } from "react";

interface Props {
  src?: string;
  alt?: string;
}

const Banner: FC<Props> = ({ src, alt }): JSX.Element => {
  return (
    <div className="overflow-hidden z-0 h-96">
      <img
        src={
          src
            ? src
            : "https://res.cloudinary.com/dxsiwyv8k/image/upload/v1689054663/dev-blogs/rlji0pbybfbwp6cxpbzy.png"
        }
        alt={alt ? alt : "Banner"}
        className="w-full object-cover h-full"
      />
    </div>
  );
};

export default Banner;
