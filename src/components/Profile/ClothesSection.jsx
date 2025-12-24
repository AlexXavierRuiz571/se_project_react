import { useContext, useMemo } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({ clothingItems, onAddItem, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = useMemo(() => {
    const userId = currentUser?._id;
    if (!userId) return [];
    return clothingItems.filter((item) => {
      const ownerId = item.owner?._id ?? item.owner;
      return ownerId === userId;
    });
  }, [clothingItems, currentUser]);

  return (
    <section className="profile__clothes">
      <div className="profile__title-row">
        <h2 className="profile__title">Your items</h2>
        <button type="button" className="profile__add-button" onClick={onAddItem}>
          + Add new
        </button>
      </div>

      <ul className="profile__cards">
        {userItems.map((item) => (
          <ItemCard
            key={item._id || item.id || item.name}
            item={item}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </section>
  );
}
