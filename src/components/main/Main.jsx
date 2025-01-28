import { useContext, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";
const Main = () => {
	const {
		onSent,
		recentPrompt,
		showResults,
		loading,
		resultData,
		setInput,
		input,
	} = useContext(Context);

	const [isEditing, setIsEditing] = useState(false);
	const [editedResult, setEditedResult] = useState(resultData);

	const handleCardClick = (promptText) => {
		setInput(promptText);
	};

	const downloadResults = () => {
		const element = document.createElement("a");
		const file = new Blob([resultData], { type: "text/plain" });
		element.href = URL.createObjectURL(file);
		element.download = "documentation.md";
		document.body.appendChild(element);
		element.click();
	};

	const regenerateResults = () => {
		onSent(recentPrompt);
	};

	const handleEditClick = () => {
		setIsEditing(true);
		setEditedResult(resultData);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
		// Optionally, you can update resultData with editedResult here
	};

	const handleInputChange = (e) => {
		setEditedResult(e.target.value);
	};

	return (
		<div className="main">
			<div className="nav">
				<p>Strange DocGen </p>
			</div>
			<div className="main-container">
				{!showResults ? (
					<>
						<div className="greet">
							<p>
								<span>Hello , Developer</span>
							</p>
							<p>Do you have a code you need documentation for?</p>
						</div>
						<div className="cards">
							<div
								className="card"
								onClick={() =>
									handleCardClick("")
								}
							>
								<p>Generate a react code documentation for my react code </p>
								<img src={assets.compass_icon} alt="" />
							</div>
							<div
								className="card"
								onClick={() =>
									handleCardClick(
										""
									)
								}
							>
								<p>How to create a clear coding documentation</p>
								<img src={assets.message_icon} alt="" />
							</div>
							<div
								className="card"
								onClick={() =>
									handleCardClick("")
								}
							>
								<p>Improves Software Usability</p>
								<img src={assets.bulb_icon} alt="" />
							</div>
							<div
								className="card"
								onClick={() => {
									handleCardClick(
										" "
									);
								}}
							>
								<p>Ensures Knowledge Preservation </p>
								<img src={assets.code_icon} alt="" />
							</div>
						</div>
					</>
				) : (
					<div className="result">
						<div className="result-title">
							<img src={assets.user} alt="" />
							<p>{recentPrompt}</p>
						</div>
						<div className="result-data">
							<img src={assets.gemini_icon} alt="" />
							{loading ? (
								<div className="loader">
									<hr />
									<hr />
									<hr />
								</div>
							) : (
								<>
									{isEditing ? (
										<textarea value={editedResult} onChange={handleInputChange}></textarea>
									) : (
										<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
									)}
									<button onClick={downloadResults}>Download Documentation</button>
									<button onClick={regenerateResults}>Regenerate Results</button>
									{isEditing ? (
										<button onClick={handleSaveClick}>Save</button>
									) : (
										<button onClick={handleEditClick}>Edit</button>
									)}
								</>
							)}
						</div>
					</div>
				)}

				<div className="main-bottom">
					<div className="search-box">
						<input
							onChange={(e) => {
								setInput(e.target.value);
							}}
							value={input}
							type="file" 
							placeholder="Upload code here to get the documentation generated"
						/>
						<div>
							<img
								src={assets.send_icon}
								alt=""
								onClick={() => {
									onSent();
								}}
							/>
						</div>
					</div>
					<div className="bottom-info">
						<p>
							Please this is just the first version of the code documentation generator develop by John & Rose. 
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
