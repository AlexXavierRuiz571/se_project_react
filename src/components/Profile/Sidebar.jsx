import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatarFallback from "../../assets/avatar.png";

export default function SideBar({ onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const displayName = currentUser?.name || "User";
  const displayAvatar = currentUser?.avatar || avatarFallback;

  return (
    <aside className="profile__sidebar">
      <img
        className="profile__avatar"
        src={displayAvatar}
        alt={`${displayName} avatar`}
      />
      <p className="profile__username">{displayName}</p>

      <button
        type="button"
        className="profile__edit-btn"
        onClick={onEditProfile}
      >
        Change profile data
      </button>
    </aside>
  );
}
