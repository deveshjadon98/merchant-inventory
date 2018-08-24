import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './MerchantForm.scss';

const CLOUDINARY_UPLOAD_PRESET = 'eioe0dcs';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/critox/upload';

class MerchantForm extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			merchantDetails: {
				firstName: '',
				lastName: '',
				avatarUrl: '',
				email: '',
				phone: '',
				hasPremium: false,
				bids: []
			},
			uploadedFile: null,
			errors:{}
		};
	}

	componentWillUnmount() {
		!this.props.isCreate ? this.props.resetMerchant() : '';
	}

	handleValidation() {
		let fields = this.state.merchantDetails;
		let errors = {};
		let formIsValid = true;

		//First Name
		if (fields["firstName"] === '') {
			formIsValid = false;
			errors["firstName"] = "Cannot be empty";
		}

		if (typeof fields["firstName"] !== "undefined") {
			if (!fields["firstName"].match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["firstName"] = "Only letters";
			}
		}

		//Last Name
		if (fields["lastName"] === '') {
			formIsValid = false;
			errors["lastName"] = "Cannot be empty";
		}

		if (typeof fields["lastName"] !== "undefined") {
			if (!fields["lastName"].match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["lastName"] = "Only letters";
			}
		}

		//Email
		if (fields["email"] === '') {
			formIsValid = false;
			errors["email"] = "Cannot be empty";
		}

		if (typeof fields["email"] !== "undefined") {
			let lastAtPos = fields["email"].lastIndexOf('@');
			let lastDotPos = fields["email"].lastIndexOf('.');

			if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
				formIsValid = false;
				errors["email"] = "Email is not valid";
			}
		}

		//Phone Number
		if (fields["phone"] === '') {
			formIsValid = false;
			errors["phone"] = "Cannot be empty";
		}

		if (typeof fields["phone"] !== "undefined") {
			if (!fields["phone"].match(/^[1-9][0-9]*$/)) {
				formIsValid = false;
				errors["phone"] = "Only Numbers and It should not start with 0";
			}
			if(fields["phone"].length != 10){
				formIsValid = false;
				errors["phone"] = "Phone Number must be of 10 digits";
			}
		}

		this.setState({ errors: errors });
		return formIsValid;
	}

	resetState = () => {
		let merchantDetails = {
			firstName: '',
			lastName: '',
			avatarUrl: '',
			email: '',
			phone: '',
			hasPremium: false,
			bids: []
		}
		this.setState({ merchantDetails: merchantDetails, uploadedFile: null, errors: {} });
	}

	onImageDrop = (files) => {
		this.setState({
			uploadedFile: files[0]
		});

		this.handleImageUpload(files[0]);
	}

	handleImageUpload = (file) => {
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
			.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
			.field('file', file);

		upload.end((err, response) => {
			if (err) {
				console.error(err);
			}

			if (response.body.secure_url !== '') {
				let merchantDetails = { ...this.state.merchantDetails }
				merchantDetails.avatarUrl = response.body.secure_url
				this.setState({
					merchantDetails: { ...merchantDetails }
				});
			}
		});
	}

	handleSubmit = () => {
		this.setState({errors: {}})
		let isValid = this.handleValidation();
		if(isValid){
			this.props.isCreate ? this.props.createMerchant({ data: { ...this.state.merchantDetails } }) : this.props.updateMerchant({ data: { ...this.state.merchantDetails }, id: this.props.id });
		} 
	}

	handleChange = (event) => {
		let formState = { ...this.state.merchantDetails };
		if (event.target.name === 'hasPremium')
			formState['hasPremium'] = !formState['hasPremium']
		else
			formState[event.target.name] = event.target.value;
		this.setState({ merchantDetails: { ...formState } });
	}

	populateForm = () => {
		let formState = { ...this.state.merchantDetails };
		for (let prop in this.props.merchantDetails) {
			if (formState.hasOwnProperty(prop)) {
				formState[prop] = this.props.merchantDetails[prop];
			}
		}
		this.setState({ merchantDetails: { ...formState } });
	}

	componentDidMount() {
	}
	
	render() {
		( !this.props.isCreate && this.props.merchantDetails && Object.keys(this.props.merchantDetails).length > 0 && this.state.merchantDetails.firstName === '' ) ? this.populateForm() : '';
		return (
			<section className='merchant-form'>
				<div className="card">
					<form className="form">
						<div className="form-control">
							<Dropzone className="drop-zone"
								onDrop={this.onImageDrop.bind(this)}
								multiple={false}
								accept="image/*">
								{this.state.merchantDetails.avatarUrl === '' ? <div>Drop an image or click to select a file to upload.</div> :
									<div>
										<img width="200px" height="200px" src={this.state.merchantDetails.avatarUrl} />
									</div>}
							</Dropzone>
						</div>
						<div className="form-control">
							<label className="form-label" htmlFor="firstName">First Name</label>
							<input type="text" id="firstName" name="firstName" value={this.state.merchantDetails.firstName} onChange={(event) => this.handleChange(event)} className="form-input" autoComplete="false" />
							{this.state.errors['firstName'] ? <span data-tooltip={this.state.errors['firstName']} className="error"><i className="material-icons">
warning
</i></span> : ''}
						</div>
						<div className="form-control">
							<label className="form-label" htmlFor="lastName">Last Name</label>
							<input type="text" id="lastName" name="lastName" value={this.state.merchantDetails.lastName} onChange={(event) => this.handleChange(event)} className="form-input" autoComplete="false" />
							{this.state.errors['lastName'] ? <span data-tooltip={this.state.errors['lastName']} className="error"><i className="material-icons">
warning
</i></span> : ''}			
						</div>
						<div className="form-control">
							<label className="form-label" htmlFor="email">Email</label>
							<input type="text" id="email" name="email" value={this.state.merchantDetails.email} onChange={(event) => this.handleChange(event)} className="form-input" autoComplete="false" />
							{this.state.errors['email'] ? <span data-tooltip={this.state.errors['email']} className="error"><i className="material-icons">
warning
</i></span> : ''}
						</div>
						<div className="form-control">
							<label className="form-label" htmlFor="phone">Phone</label>
							<input type="text" name="phone" value={this.state.merchantDetails.phone} onChange={(event) => this.handleChange(event)} className="form-input" autoComplete="false" />
							{this.state.errors['phone'] ? <span data-tooltip={this.state.errors['phone']} className="error"><i className="material-icons">
warning
</i></span> : ''}
						</div>
						<div className="form-control">
							<label className="form-label" htmlFor="hasPremium">Has Premium</label>
							<div className="form-switch align-left">
								<label className="switch">
									<input type="checkbox" name="hasPremium" id="hasPremium" checked={this.state.merchantDetails.hasPremium} onChange={(event) => this.handleChange(event)} />
									<span className="slider"></span>
								</label>
							</div>
						</div>
						<div className="form-control align-right">
							<input type="button" onClick={(event) => this.handleSubmit(event)} className="btn btn-primary" value={this.props.isCreate ? 'Add Merchant' : 'Update Merchant'} />
						</div>
					</form>
				</div>
			</section>
		);
	}
}

export default MerchantForm;
