import { Card } from "react-bootstrap";

import Icons from "../constants/icons";
import { Spell } from "../models/Spells";

interface SpellBlockProps {
  spell: Spell;
  index: number;
  onFavClick: () => void;
  onItemClick: () => void;
  style: React.CSSProperties;
}

const SpellBlock: React.FC<SpellBlockProps> = ({
  spell,
  index,
  style,
  onFavClick,
  onItemClick,
}) => (
  <Card
    style={style}
    onClick={onItemClick}
    className={
      "justify-content-center align-items-center " +
      (index % 2 === 0 ? "border-0" : "bg-dark text-light")
    }
  >
    <h4>{spell.name}</h4>
    <Card.Link
      onClick={onFavClick}
      className="text-decoration-none cursor-pointer"
    >
      {spell.isFav ? Icons.favFilledIcon : Icons.favHollowIcon}
    </Card.Link>
  </Card>
);

export default SpellBlock;
