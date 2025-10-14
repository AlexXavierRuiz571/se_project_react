import "./Profile.css";
import SideBar from "./Sidebar";
import ClothesSection from "./ClothesSection";

export default function Profile({
  clothingItems,
  addClothesButtonClick,
  handleCardClick,
}) {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onAddItem={addClothesButtonClick}
        onCardClick={handleCardClick}
      />
    </main>
  );
}
