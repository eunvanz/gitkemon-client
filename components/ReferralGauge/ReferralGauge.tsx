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
        <div className="animate-bounce">
          <PokeBallImage width={24} height={24} type="elite" />
        </div>
        <div className="animate-bounce">
          <PokeBallImage width={24} height={24} type="legend" />
        </div>
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
