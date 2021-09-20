import LineGauge from "../LineGauge";
import PokeBallImage from "../PokeBallImage";
import Typography from "../Typography";

const MAX = 50;

export interface ReferralGaugeProps {
  count?: number;
}

const ReferralGauge: React.FC<ReferralGaugeProps> = ({ count }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <Typography>
          <Typography color="primary">{count || 0}</Typography> / {MAX}
        </Typography>
        <PokeBallImage className="w-6 h-6 animate-bounce" type="elite" />
        <PokeBallImage className="w-6 h-6 animate-bounce" type="legend" />
      </div>
      <div className="px-3 pt-2">
        <LineGauge
          values={[
            {
              color: "blue-500",
              value: Math.min(((count || 0) * 100) / MAX, 100),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ReferralGauge;
