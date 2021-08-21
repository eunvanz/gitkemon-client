import { useCallback, useMemo, useState } from "react";
import { message } from "antd";
import { useRouter } from "next/router";
import api from "../../../../api";
import ROUTES from "../../../../paths";
import useMonQuery from "../../../../queries/useMonQuery";
import useMonsQuery from "../../../../queries/useMonsQuery";
import { MonFormValues, MonProps } from "./Mon.view";

const useMonProps: () => MonProps = () => {
  const { data: mons, isLoading: isMonsLoading } = useMonsQuery();

  const router = useRouter();

  const { monId } = router.query as { monId: string };

  const { data: mon, isLoading: isMonLoading } = useMonQuery(+monId);

  const defaultFormValues = useMemo(() => {
    return mon as MonFormValues;
  }, [mon]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onNavigateToList = useCallback(() => {
    router.push(ROUTES.ADMIN__MONS);
  }, [router]);

  const onSubmit = useCallback(
    async (values: MonFormValues) => {
      setIsSubmitting(true);
      try {
        if (monId) {
          await api.patchMon(values.id, values);
        } else {
          await api.postMon(values);
        }
      } catch (error) {
        // TODO:
      } finally {
        message.success("Mon has been saved.");
        setIsSubmitting(false);
      }
    },
    [monId],
  );

  return {
    onSubmit,
    onNavigateToList,
    isLoading: isMonLoading || isMonsLoading,
    isSubmitting,
    defaultFormValues,
    mons,
  };
};

export default useMonProps;
