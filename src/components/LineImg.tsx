import { Tooltip } from "pol-ui";
import { LineName } from "../types/types";
import { getLineInfo } from "../util/get-info";

const LineImg = ({ l }: { l: LineName }) => {
  const line = getLineInfo(l);
  return (
    <li key={l} className="inline-block">
      <Tooltip key={l} label={`${line?.metadata.distance} km`}>
        <img
          width={23}
          height={23}
          className="rounded-lg p-0.5 h-[23px] shadow-md"
          style={{
            backgroundColor: `${line?.metadata.color}`,
          }}
          src={`/logos/${l}.svg`}
          alt="logo"
        />
      </Tooltip>
    </li>
  );
};

export default LineImg;
