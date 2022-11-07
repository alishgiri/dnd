import { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Container, Spinner, Row, Alert } from "react-bootstrap";

import { Spell } from "../models/Spells";
import DndService from "../services/DndService";
import SpellBlock from "../components/SpellBlock";
import commonHandlers, { CommonHandlerProps } from "../hoc/commonHandlers";

const SpellsList: React.FC<CommonHandlerProps> = (props) => {
  const [spells, setSpells] = useState<Spell[] | null>(null);
  const [spellsCount, setSpellsCount] = useState<number | null>(null);

  useEffect(() => {
    const getSpells = async () => {
      try {
        const spells = await DndService.fetchSpells();
        setSpells(spells.results);
        setSpellsCount(spells.count);
      } catch (error: any) {
        props.handleError(error);
      }
    };

    getSpells();
  }, []);

  const addToFav = async (spell: Spell) => {
    try {
      if (spell.isFav) {
        await DndService.removeSpellFromFav(spell);
      } else {
        await DndService.addSpellToFav(spell);
      }

      // Locally handle the update
      spell.isFav = !(spell.isFav ?? false);
      setSpells([...spells!]);
    } catch (error: any) {
      props.handleError(error);
    }
  };

  const displaySpellDetails = () => {};

  const ListRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const spell = spells![index];
    return (
      <SpellBlock
        index={index}
        style={style}
        spell={spell}
        onItemClick={displaySpellDetails}
        onFavClick={() => addToFav(spell)}
      />
    );
  };

  return (
    <Container className="h-100">
      {props.errMsg && (
        <Alert variant="danger" className="text-center my-3">
          {props.errMsg}
        </Alert>
      )}
      {spells == null ? (
        <Row className="mt-5 justify-content-center">
          <Spinner animation="border" />
        </Row>
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
              itemCount={spellsCount!}
            >
              {ListRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      )}
    </Container>
  );
};

export default commonHandlers(SpellsList);
