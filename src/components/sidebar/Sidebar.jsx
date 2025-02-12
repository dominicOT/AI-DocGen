import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
const Sidebar = () => {
	const [extended, setExtended] = useState(false);
	const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

	const loadPreviousPrompt = async (prompt) => {
		setRecentPrompt(prompt);
		await onSent(prompt);
	};
	return (
		<div className="sidebar">
			<div className="top">
				<img
					src={assets.menu_icon}
					className="menu"
					alt="menu-icon"
					onClick={() => {
						setExtended((prev) => !prev);
					}}
				/>
				<div className="new-chat">
					<img src={assets.plus_icon} alt="" onClick={() => {
						newChat()
					}} />
					{extended ? <p>New Documentation</p> : null}
				</div>
				{extended ? (
					<div className="recent">
						<p className="recent-title">Recent</p>
						{prevPrompts.map((item, index) => {
							return (
								<div onClick={() => {
									loadPreviousPrompt(item)
								}} className="recent-entry">
									<img src={assets.message_icon} alt="" />
									<p>{item.slice(0, 14)}...</p>
								</div>
							);
						})}
					</div>
				) : null}
			</div>
			
		</div>
	);
};

export default Sidebar;
