import "./Profile.css";
import SideBar from "./Sidebar";
import ClothesSection from "./ClothesSection";

function Profile({
  clothingItems,
  addClothesButtonClick,
  handleCardClick,
  onCardLike,
  onEditProfile,
  onSignOut,
}) {
  return (
    <section className="profile">
      <SideBar
        onEditProfile={onEditProfile}
        onSignOut={onSignOut}
      />

      <ClothesSection
        clothingItems={clothingItems}
        addClothesButtonClick={addClothesButtonClick}
        handleCardClick={handleCardClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}

export default Profile;
