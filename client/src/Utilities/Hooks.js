import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
	const [values, setValues] = useState(initialState);
	const onChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const onSubmitForm = e => {
		e.preventDefault();
		callback();
	};

	return {
		onChange,
		onSubmitForm,
		values
	};
};
