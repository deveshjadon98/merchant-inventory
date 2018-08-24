import React from 'react';
import { connect } from 'react-redux';
import { appActionCreator } from './../../actions';
import DataTable from './../../components/DataTable/DataTable';
import { withRouter } from 'react-router-dom';

class MerchantsTable extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			shownData: [],
			allowedProps:['firstName','lastName','email','phone','hasPremium','bids'],
			headers:['First Name','Last Name','Email','Phone','Premium','Bids','Action']
		};
	}

	clientSidePagination = (start) => {
		let shownData = this.props.merchants.slice(start, start + 5);
		this.setState({ shownData: shownData });
	}

	viewDetails = (id) =>  {
		this.props.history.push('/merchant/'+id);
	}

	editRecord = (id) =>  {
		this.props.history.push('/edit-merchant/'+id);
	}

	deleteRecord = (id) => {
		this.props.deleteMerchant(id);
	}

	render() {
		this.props.merchants.length > 0 && this.state.shownData.length === 0 ? this.clientSidePagination(1) : '';
		return <DataTable
			data={this.state.shownData}
			totalCount={this.props.merchants.length}
			requestData={this.props.requestMerchants}
			clientSidePagination={this.clientSidePagination}
			allowedProps={this.state.allowedProps}
			headers={this.state.headers}
			viewDetails={this.viewDetails}
			editRecord={this.editRecord}
			deleteRecord={this.deleteRecord}
			tableFor={'MERCHANTS'}
		/>
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		merchants: state.app.merchants ? state.app.merchants : []
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		requestMerchants: () => dispatch(appActionCreator.requestMerchants()),
		deleteMerchant: (id) => dispatch(appActionCreator.deleteMerchant(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MerchantsTable));