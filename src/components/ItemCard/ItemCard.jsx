import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => onCardClick(item);
  const src = item.link ?? item.imageUrl ?? "";

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={src}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
