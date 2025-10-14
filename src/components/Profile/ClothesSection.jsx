import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({ clothingItems, onAddItem, onCardClick }) {
  return (
    <section className="profile__clothes">
      <div className="profile__title-row">
        <h2 className="profile__title">Your items</h2>
        <button type="button" className="profile__add-button" onClick={onAddItem}>
          + Add new
        </button>
      </div>

      <ul className="profile__cards">
        {clothingItems.map((item) => (
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
