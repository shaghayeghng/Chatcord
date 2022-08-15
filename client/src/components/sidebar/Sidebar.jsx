import "./sidebar.css";
import { Chat, Group, Bookmark, Event } from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Sidebar() {
  const [mightKnowfriends, setMightKnowfriends] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversation/" + user._id);
        const conversation = res.data.conversation;
        setMightKnowfriends(
          conversation.map((c) => {
            const friend =
              c.members[0]._id === user._id ? c.members[1] : c.members[0];
            if (!user.followings.includes(friend._id)) return friend;
            //todo fix this with populate
            return user.followers;
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
        </ul>
        {/* <button className="sidebarButton">Show More</button> */}
        <hr className="sidebarHr" />
        <h4 className="leftSidebarTitle">You Might Know</h4>
        <ul className="sidebarFriendList">
          {mightKnowfriends.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
