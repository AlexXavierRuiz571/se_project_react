import avatar from "../../assets/avatar.png";

export default function SideBar() {
  return (
    <aside className="profile__sidebar">
      <img className="profile__avatar" src={avatar} alt="Terrence Tegegne" />
      <p className="profile__username">Terrence Tegegne</p>
    </aside>
  );
}
