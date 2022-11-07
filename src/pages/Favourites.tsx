import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import AutoSizer from "react-virtualized-auto-sizer";

import { Spell } from "../models/Spells";
import DndService from "../services/DndService";
import SpellBlock from "../components/SpellBlock";
import commonHandlers, { CommonHandlerProps } from "../hoc/commonHandlers";

const FavouriteList: React.FC<CommonHandlerProps> = (props) => {
  const [favourites, setFavourites] = useState<Spell[] | null>(null);

  useEffect(() => {
    const getSpells = async () => {
      try {
        const favourites = await DndService.fetchFavouriteSpells();
        setFavourites(favourites);
      } catch (error) {
        props.handleError(error);
      }
    };

    getSpells();
  }, []);

  const removeFromFav = async (spell: Spell) => {
    try {
      await DndService.removeSpellFromFav(spell);

      // Locally handle the update
      spell.isFav = !(spell.isFav ?? false);
      const updatedFav = favourites!.filter((f) => f.name !== spell.name);
      setFavourites([...updatedFav!]);
    } catch (error: any) {
      props.handleError(error);
    }
  };

  const displaySpellDetails = async (spell: Spell) => {
    try {
      if (!spell.detail) {
        props.toggleIsLoading();
        spell.detail = await DndService.fetchSpellDetails(spell.url);
        props.toggleIsLoading();
        setFavourites([...favourites!]);
      }
      props.toggleModal(spell);
    } catch (error) {
      props.toggleModal();
      props.handleError(error);
    }
  };

  const ListRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const favSpell = favourites![index];
    return (
      <SpellBlock
        index={index}
        style={style}
        spell={favSpell}
        onItemClick={displaySpellDetails}
        onFavClick={() => removeFromFav(favSpell)}
      />
    );
  };

  if (favourites == null) {
    return <Spinner animation="border" />;
  }

  return (
    <Container className="h-100">
      {props.errMsg && (
        <Alert variant="danger" className="text-center my-3">
          {props.errMsg}
        </Alert>
      )}
      {favourites.length === 0 ? (
        <Alert variant="secoundary" className="text-center my-5">
          List is empty!
        </Alert>
      ) : (
        <AutoSizer>
          {({
            height,
            width,
          }: {
            height: number | string;
            width: number | string;
          }) => (
            <FixedSizeList
              width={width}
              itemSize={120}
              height={height}
              itemCount={favourites.length}
            >
              {ListRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      )}
    </Container>
  );
};

export default commonHandlers(FavouriteList);
