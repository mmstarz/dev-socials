import React from "react";
// els
import TopSection from "./topSection";
import SkillsSection from "./skillsSection";
import BioSection from "./bioSection";
// mui els
import Card from "@material-ui/core/Card";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		minWidth: 250,
		margin: 4,
		"&::-webkit-scrollbar-track": {
			backgroundColor: "white",
			boxShadow: "inset 0 0 2px rgba(0, 0, 0, 0.3)",
		},
		"&::-webkit-scrollbar": {
			width: 4,
			backgroundColor: "white",
		},
		"&::-webkit-scrollbar-thumb": {
			backgroundColor: "#E91E63",
			outline: "1px solid slategrey",
		},
		"@media(max-width: 530px)": {
			maxWidth: 350,
		}		
	},
}));

const MainWrapper = () => {
	const classes = useStyles();

	return (
		<Card classes={{ root: classes.root }}>
			<TopSection />
			<SkillsSection />
			<BioSection />
		</Card>
	);
};

export default MainWrapper;
