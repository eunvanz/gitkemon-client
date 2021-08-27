import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { MonModalContainerProps } from ".";
import { assertNotEmpty, capitalize } from "../../helpers/commonHelpers";
import { convertCollectionToModalMon } from "../../helpers/projectHelpers";
import ROUTES from "../../paths";
import useCollectionQuery from "../../queries/useCollectionQuery";
import { blendMonState } from "../../state/blendMon";
import { evolveMonState } from "../../state/evolveMon";
import { userState } from "../../state/user";
import Dialog from "../Dialog/Dialog";
import Typography from "../Typography";
import { MonModalProps } from "./MonModal";

const useMonModalProps: (options: MonModalContainerProps) => MonModalProps = ({
  isOpen,
  onOpen,
  onClose,
  collectionId,
  oldMon,
  newMon,
}) => {
  const { data: collection } = useCollectionQuery(collectionId, {
    enabled: isOpen,
  });

  const mon = useMemo(() => {
    return newMon || (collection ? convertCollectionToModalMon(collection) : undefined);
  }, [collection, newMon]);

  const router = useRouter();

  const setEvolveMon = useSetRecoilState(evolveMonState);
  const [blendMon, setBlendMon] = useRecoilState(blendMonState);
  const user = useRecoilValue(userState);

  const onEvolve = useCallback(async () => {
    assertNotEmpty(mon);
    const levelToDown = mon.level! - mon.evolutionLevel!;
    const content =
      levelToDown === 0 ? (
        <>
          <Typography color="primary">{capitalize(mon.name)}</Typography> will disappear.
          Are you sure to evolve?
        </>
      ) : (
        <>
          <Typography color="primary">{capitalize(mon.name)}</Typography>&apos;s level
          will be down to <Typography color="primary">{levelToDown}</Typography>. Are you
          sure to evolve?
        </>
      );
    onClose();
    const isConfirmed = await Dialog.confirm({ content });
    if (isConfirmed) {
      setEvolveMon(collection);
      router.push(ROUTES.EVOLUTION);
    } else {
      onOpen();
    }
  }, [collection, mon, onClose, onOpen, router, setEvolveMon]);

  const onBlend = useCallback(async () => {
    collection && setBlendMon([collection]);
    onClose();
    router.push(`${ROUTES.COLLECTIONS}/${user!.id}`);
  }, [collection, onClose, router, setBlendMon, user]);

  const isBlendHidden = useMemo(() => {
    return !!blendMon;
  }, [blendMon]);

  return {
    isOpen,
    onClose,
    mon,
    oldMon,
    onEvolve,
    onBlend,
    isBlendHidden,
  };
};

export default useMonModalProps;
