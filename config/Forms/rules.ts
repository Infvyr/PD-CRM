import { Rule } from 'antd/lib/form';

type RuleKey =
	| 'name'
	| 'profileName'
	| 'roleName'
	| 'email'
	| 'password'
	| 'dateTC'
	| 'dateCollection'
	| 'dateDelivery'
	| 'paymentType'
	| 'typeOfAddress'
	| 'addressPostcode'
	| 'address'
	| 'availableHours'
	| 'url'
	| 'phone';

export const rules: { [key in RuleKey]: Rule[] } = {
	name: [
		{
			required: true,
			message: 'Name is required!',
			whitespace: true
		},
		{
			min: 2,
			message: 'Name must be at least 2 characters!'
		}
	],
	profileName: [
		{
			required: true,
			message: 'Profile name is required!',
			whitespace: true
		},
		{
			min: 2,
			message: 'Profile name must be at least 2 characters!'
		}
	],
	roleName: [
		{
			required: true,
			message: 'Role name is required!',
			whitespace: true
		},
		{
			min: 2,
			message: 'Role name must be at least 2 characters!'
		}
	],
	email: [
		{
			required: true,
			message: 'Email is required!',
			whitespace: true
		},
		{
			type: 'email',
			message: 'Email is not valid'
		}
	],
	password: [
		{
			required: true,
			message: 'Please input your password!'
		},
		{
			pattern: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
			message:
				'Password must be at least eight characters long and must contain at least one letter, one number and one special character'
		}
	],
	dateTC: [{ required: true, message: 'Please select due date!' }],
	dateCollection: [
		{ required: true, message: 'Please select collection date!' }
	],
	dateDelivery: [{ required: true, message: 'Please select delivery date!' }],
	paymentType: [
		{
			required: true,
			message: 'Please select a payment type!'
		}
	],
	typeOfAddress: [{ required: true, message: 'Please select an option!' }],
	addressPostcode: [
		{
			required: true,
			message: 'Please select a postcode!'
		}
	],
	address: [
		{
			required: true,
			message: 'Enter an address!'
		}
	],
	availableHours: [
		{
			required: true,
			message: 'Please specify available hours!'
		}
	],
	url: [
		{
			required: false,
			message: 'Please input a valid url!'
		}
	],
	phone: [
		{
			type: 'number',
			message: 'Phone must contain only numbers',
			transform: (value) => (value === undefined ? 0 : +value)
		}
	]
};
