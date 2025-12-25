import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatarFallback from "../../assets/avatar.png";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const displayName = currentUser?.name || "User";
  const displayAvatar = currentUser?.avatar || avatarFallback;

  return (
    <aside className="profile__sidebar">
      <div className="profile__info">
        <img
          className="profile__avatar"
          src={displayAvatar}
          alt={`${displayName} avatar`}
        />

        <p className="profile__username">{displayName}</p>
      </div>
      
      <button
        type="button"
        className="profile__edit-button"
        onClick={onEditProfile}
      >
        Change profile data
      </button>

      <button
        type="button"
        className="profile__signout-button"
        onClick={onSignOut}
      >
        Log Out
      </button>
    </aside>
  );
}
