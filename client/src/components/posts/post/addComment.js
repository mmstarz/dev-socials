import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import * as PostActions from "../../../store/actions/postActions";
// mui els
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
// icons
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
// with styles
import {
	ButtonPrimary,
	BoxFormActionsSpace,
	BoxMessageDanger,
} from "../../../widgets/withStyles/withStyles";
// styles
import { makeStyles } from "@material-ui/core/styles";
// formData
import PostInputs from "../post-inputs/postInputs";
import { commentForm, clearCommentForm } from "../post-forms/addComment";

const useStyles = makeStyles((theme) => ({	
	paper_root: {
		width: "100%",
    	margin: "4px 0",
    	padding: 4,
    	maxWidth: 600,    
    	filter: "drop-shadow(0px 0px 2px black)",
	},
}));

const AddComment = ({ addComment, post_id }) => {
	const classes = useStyles();
	const [formSchema, setFormSchema] = useState({ ...commentForm });
	const [formStatus, setFormStatus] = useState(false);

	const cleanFormState = () => {
		clearCommentForm();
		setFormStatus(false);
		setFormSchema({ ...commentForm });
	};

	const formValidation = (schema) => {
		// console.log("schema to validate: ", schema);
		// test object
		let test = {};
		// form test object

		Object.entries(schema).forEach(([key, value]) => {
			if (!value.options.valid) {
				// console.log([key, value]);
				test[key] = false;
			} else {
				delete test.key;
			}
		});

		// console.log("test: ", test);

		// check test length
		if (Object.keys(test).length > 0) {
			setFormStatus(false);
		} else {
			setFormStatus(true);
		}
	};

	const handleChange = (e) => {
		let updatedSchema = { ...formSchema };

		updatedSchema = {
			...formSchema,
			[e.target.name]: {
				...formSchema[e.target.name],
				elementBody: {
					...formSchema[e.target.name].elementBody,
					value: e.target.value,
				},
				options: {
					...formSchema[e.target.name].options,
					typed: true,
				},
			},
		};

		function extraCheck(name) {
			if (updatedSchema[name].elementBody.required) {
				let val = updatedSchema[name].elementBody.value;
				if (val.length > 0) {
					updatedSchema[name].options.valid = true;
					updatedSchema[name].error = {
						msg: "",
					};
				} else {
					updatedSchema[name].options.valid = false;
					updatedSchema[name].error = {
						msg: `Fill up the ${updatedSchema[name].info} field please`,
					};
				}
			}
		}

		extraCheck(e.target.name);

		formValidation(updatedSchema);
		setFormSchema(updatedSchema);
	};

	const handleTouch = (e) => {
		// console.log("handle touch");
		let updatedSchema = {
			...formSchema,
			[e.target.name]: {
				...formSchema[e.target.name],
				options: {
					...formSchema[e.target.name].options,
					touched: true,
				},
			},
		};

		setFormSchema(updatedSchema);
	};

	const handleBlur = (e) => {
		// console.log("handle blur");
		let updatedSchema = {
			...formSchema,
			[e.target.name]: {
				...formSchema[e.target.name],
				options: {
					...formSchema[e.target.name].options,
					touched: false,
				},
			},
		};

		setFormSchema(updatedSchema);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		e.persist();

		let dataToSend = {};
		// form dataToSend
		Object.entries(formSchema).forEach(([key, value]) => {
			// ? transform skills into array of strings
			if (key !== "current") {
				dataToSend[key] = value.elementBody.value;
			} else {
				dataToSend[key] = value.elementBody.checked;
			}
		});
		// @create post action
		addComment(post_id, dataToSend);

		cleanFormState();
		e.target.reset();
		// alert("Sumitted successufully: " + JSON.stringify(dataToSend));
	};

	useEffect(() => {
		let mount = true;

		return () => {
			mount = false;

			if (!mount) {
				clearCommentForm();
			}
		};
	}, []);

	const renderErrorsMessage = () => {
		// find first field with error msg
		let el = {};
		el = Object.entries(formSchema).find(
			([key, value]) => value.error.msg.length > 0
		);
		// console.log("error el: ", el);

		if (el) {
			return (
				<React.Fragment>
					{!el[1].options.touched && (
						<BoxMessageDanger>{el[1].error.msg}</BoxMessageDanger>
					)}
				</React.Fragment>
			);
		}
	};

	const renderFormFields = () => {
		// [{},...] // main form fields
		return Object.entries(formSchema).map(([key, value]) => {
			return (
				<PostInputs
					key={key}
					{...value}
					onChange={(e) => handleChange(e)}
					onFocus={(e) => handleTouch(e)}
					onBlur={(e) => handleBlur(e)}
				/>
			);
		});
	};

	return (
		<Paper classes={{ root: classes.paper_root }} >
			<form className="form" onSubmit={(e) => handleSubmit(e)}>
				{renderErrorsMessage()}
				{renderFormFields()}

				<BoxFormActionsSpace>
					<ButtonPrimary
						type="submit"
						variant="contained"
						size="medium"
						color="primary"
						startIcon={<SaveIcon />}
						disabled={!formStatus}
					>
						Submit
					</ButtonPrimary>
					<Button
						variant="contained"
						color="secondary"
						size="medium"
						startIcon={<CancelIcon />}
						onClick={() => cleanFormState()}
					>
						Clear
					</Button>
				</BoxFormActionsSpace>
			</form>
		</Paper>
	);
};

AddComment.propTypes = {
	addComment: PropTypes.func.isRequired,
	post_id: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		addComment: (post_id, data) => {			
			dispatch(PostActions.addComment(post_id, data));
		},
	};
};

export default connect(null, mapDispatchToProps)(AddComment);
