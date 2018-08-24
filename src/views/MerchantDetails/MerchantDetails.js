import React from 'react';
import { connect } from 'react-redux';
import { appActionCreator } from './../../actions';
import DataTable from './../../components/DataTable/DataTable';
import { withRouter } from 'react-router-dom';
import './MerchantDetails.scss';

class MerchantDetails extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			shownData: [],
			allowedProps:['carTitle', 'amount', 'created'],
			headers:['Car Title', 'Amount', 'Date']
		};
	}

	clientSidePagination = (start) => {
		let shownData = this.props.merchantDetails.bids.slice(start, start + 5);
		this.setState({ shownData: shownData });
	}

	render() {
		this.props.merchantDetails && this.props.merchantDetails.bids && this.props.merchantDetails.bids.length > 0 && this.state.shownData.length === 0 ? this.clientSidePagination(1) : '';
		return <section className="merchant-bids">
  {this.props.merchantDetails && this.props.merchantDetails.avatarUrl ? <div className="image-wrapper">
   <img width="200px" height="200px" src={this.props.merchantDetails.avatarUrl}/>
  </div> : ''}
  <DataTable
			data={this.state.shownData}
			totalCount={this.props.merchantDetails && this.props.merchantDetails.bids ? this.props.merchantDetails.bids.length : 0}
			requestData={()=>this.props.requestMerchant(this.props.match.params.id)}
			clientSidePagination={this.clientSidePagination}
			allowedProps={this.state.allowedProps}
   headers={this.state.headers}
   tableFor={'BIDS'}
		/>
  </section>
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
  merchantDetails: state.app.merchantDetails,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		requestMerchant: (id) => dispatch(appActionCreator.requestMerchant(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MerchantDetails));