import { useEffect, useMemo, useState } from "react";
import { User } from "@sentry/types";
import Clipboard from "clipboard";
import Alert from "../Alert";
import Button from "../Button";
import Dialog from "../Dialog";
import PokeBallImage from "../PokeBallImage";
import ReferralGauge from "../ReferralGauge";
import Typography from "../Typography";

export interface ShareUrlProps {
  user?: User;
  count?: number;
  onFetchCount: VoidFunction;
}

const ShareUrl: React.FC<ShareUrlProps> = ({ user, count, onFetchCount }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const shareUrl = useMemo(() => {
    return `https://gitkemon.com/ref/${user?.referrerCode}`;
  }, [user?.referrerCode]);

  useEffect(() => {
    const clipboard = new Clipboard("#copy-to-clipboard");
    clipboard.on("success", (e) => {
      Dialog.show({
        content: (
          <>
            <Typography color="primary">{e.text}</Typography> is copied to clipboard.
          </>
        ),
      });
    });
  }, [shareUrl]);

  useEffect(() => {
    if (isDetailVisible) {
      onFetchCount();
    }
  }, [isDetailVisible, onFetchCount]);

  return user ? (
    <div className="border rounded p-4">
      <div className="flex justify-between">
        <div>
          <Typography as="div" weight="bold">
            Share URL and get more Pokéballs!
          </Typography>
          <Typography as="a" onClick={() => setIsDetailVisible(!isDetailVisible)}>
            {isDetailVisible ? "Hide detail" : "Show detail"}
          </Typography>
        </div>
        <Button id="copy-to-clipboard" data-clipboard-text={shareUrl} color="white">
          Copy URL to clipboard
        </Button>
      </div>
      {isDetailVisible && (
        <div className="mt-4">
          <Alert
            type="info"
            title="You'll get special Pokéballs for each new users through the URL you shared."
          >
            <PokeBallImage type="rare" className="w-4 h-4 inline-block mr-2" />
            Rare Pokéballs for each new users. (up to 50)
            <br />
            <PokeBallImage type="elite" className="w-4 h-4 inline-block mr-2" />
            An elite Pokéball for total 25 new users.
            <br />
            <PokeBallImage type="legend" className="w-4 h-4 inline-block mr-2" /> A legend
            Pokéball for total 50 new users.
          </Alert>
          <div className="mt-4">
            <ReferralGauge count={count} />
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default ShareUrl;
