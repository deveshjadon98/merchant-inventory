import React from 'react';
import { connect } from 'react-redux';
import { appActionCreator } from './../../actions';
import MerchantForm from './../../components/CreateEditMerchant/MerchantForm';
import { withRouter } from 'react-router-dom';

class EditMerchant extends React.PureComponent {

 constructor(props) {
  super(props);
  this.state = {
  };
 }

 componentDidMount(){
  this.props.requestMerchant(this.props.match.params.id)
  // this.props.merchantDetails && Object.keys(this.props.merchantDetails).length > 0 ? '' : this.props.requestMerchant(this.props.match.params.id);
 }

 componentWillUnmount(){
  this.props.updateEditRequestStatus('NOT_REQUESTED');
 }
 render() {
		this.props.update_status === 'UPDATED' ? this.props.history.push('/merchants') : '';
  return <MerchantForm
   isCreate={false}
   merchantDetails={this.props.merchantDetails}
   updateMerchant={this.props.updateMerchant}
   id={this.props.match.params.id}
   resetMerchant = {this.props.resetMerchant}
  />
 }
}

const mapStateToProps = (state, ownProps) => {
 return {
  ...ownProps,
  merchantDetails: state.app.merchantDetails,
  update_status: state.app.update_status
 };
};

const mapDispatchToProps = (dispatch) => {
 return {
  updateMerchant: (payload) => dispatch(appActionCreator.updateMerchant(payload)),
  requestMerchant: (id) => dispatch(appActionCreator.requestMerchant(id)),
  resetMerchant: () => dispatch(appActionCreator.resetMerchant()),
  updateEditRequestStatus: (status) => dispatch(appActionCreator.updateEditRequestStatus(status))
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditMerchant));