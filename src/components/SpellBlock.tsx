import Card from "react-bootstrap/Card";

import Icons from "../constants/icons";
import { Spell } from "../models/Spells";

interface SpellBlockProps {
  spell: Spell;
  index: number;
  onFavClick: () => void;
  style: React.CSSProperties;
  onItemClick: (spell: Spell) => void;
}

const SpellBlock: React.FC<SpellBlockProps> = ({
  spell,
  index,
  style,
  onFavClick,
  onItemClick,
}) => {
  return (
    <Card
      style={style}
      className={
        "justify-content-center align-items-center " +
        (index % 2 === 0 ? "border-0" : "bg-dark text-light")
      }
    >
      <Card.Link
        onClick={() => onItemClick(spell)}
        className={
          "text-decoration-none cursor-pointer " +
          (index % 2 === 0 ? "text-dark" : "bg-dark text-light")
        }
      >
        <h4>{spell.name}</h4>
      </Card.Link>
      <Card.Link
        onClick={onFavClick}
        data-testid={`fav-btn-${index}`}
        className="text-decoration-none cursor-pointer mt-3"
      >
        {spell.isFav ? Icons.favFilledIcon : Icons.favHollowIcon}
      </Card.Link>
    </Card>
  );
};

export default SpellBlock;
