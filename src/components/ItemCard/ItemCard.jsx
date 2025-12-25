import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => onCardClick(item);
  const src = item.link ?? item.imageUrl ?? "";

  const likesArray = item.likes || [];

  const isLiked = currentUser
    ? likesArray.some((id) => id === currentUser._id)
    : false;

  const itemLikeButtonClassName = `card__like-button${
    isLiked ? " card__like-button_liked" : ""
  }`;

  function handleLikeClick() {
    if (!currentUser) return;
    onCardLike({ id: item._id || item.id, isLiked });
  }

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>

        {currentUser && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLikeClick}
          />
        )}
      </div>

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