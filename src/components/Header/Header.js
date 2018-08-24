import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Header extends Component {
 constructor(props){
  super(props);
 }

 redirectToList = () => {
  this.props.history.push('/merchants');
 }

 redirectToCreate = () => {
  this.props.history.push('/create-merchant');
 }

 render() {
  return (
   <header className="App-header">
    <h1 className="App-title">
    <span className="merchant-list" onClick={() => this.redirectToList()}>Merchants Inventory</span>
    <span className="create-merchant" onClick={() => this.redirectToCreate()}>Create</span>
    </h1>
   </header>
  );
 }
}

export default withRouter(Header);
