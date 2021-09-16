import Dialog from "~/components/Dialog";
import Typography from "~/components/Typography";
import { Collection } from "~/types";
import { capitalize } from "./commonHelpers";
import { getLocaleProperty } from "./projectHelpers";

export const showEvolutionConfirm = async (collection: Collection) => {
  const levelToDown = collection.level - collection.evolutionLevel!;
  const content =
    levelToDown === 0 ? (
      <>
        <Typography color="primary">
          {capitalize(getLocaleProperty(collection, "name"))}
        </Typography>{" "}
        will disappear. Are you sure to evolve?
      </>
    ) : (
      <>
        <Typography color="primary">
          {capitalize(getLocaleProperty(collection, "name"))}
        </Typography>
        &apos;s level will be down to{" "}
        <Typography color="primary">{levelToDown}</Typography>. Are you sure to evolve?
      </>
    );
  return Dialog.confirm({ content });
};
