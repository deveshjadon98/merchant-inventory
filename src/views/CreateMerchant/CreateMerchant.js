import React from 'react';
import { connect } from 'react-redux';
import { appActionCreator } from './../../actions';
import MerchantForm from './../../components/CreateEditMerchant/MerchantForm';
import { withRouter } from 'react-router-dom';

class CreateMerchant extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentWillUnmount(){
		this.props.updateCreateRequestStatus('NOT_REQUESTED');
	}

	render() {
		this.props.create_status === 'CREATED' ? this.props.history.push('/merchants') : '';
  return <MerchantForm
   isCreate={true}
   merchantDetails={this.props.merchantDetails}
   createMerchant={this.props.createMerchant}
   id={this.props.match.params.id}
  />
 }
}

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		create_status: state.app.create_status
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createMerchant: (payload) => dispatch(appActionCreator.createMerchant(payload)),
		updateCreateRequestStatus: (status) => dispatch(appActionCreator.updateCreateRequestStatus(status))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateMerchant));