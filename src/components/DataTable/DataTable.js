import React from 'react';

class DataTable extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			selectedPage: 1
		};
	}

	componentDidMount() {
		this.props.requestData();
	}

	prepareBody = () => {
		return this.props.data.map((record) => {
			const rowElements = [];
			for (let prop in record) {
				let element;
				if (this.props.allowedProps.indexOf(prop) !== -1) {
					if (prop === 'hasPremium') {
						element = record.hasPremium ? 'YES' : 'NO';
					} else if (prop === 'bids') {
						element = record.bids.length;
					} else if (prop === 'created'){
						let date = new Date(record[prop]);
						element = date.getDate() + '/' + ( date.getMonth() + 1 ) + '/' + date.getFullYear();
					} else {
						element = record[prop];
					}
					rowElements.push(<td>{element}</td>)
				}
			}
			if (this.props.tableFor === 'MERCHANTS') {
				rowElements.push(<td><span className="view" onClick={() => this.props.viewDetails(record.id)}><i className="material-icons">
					visibility
				</i></span>
					<span className="edit" onClick={() => this.props.editRecord(record.id)}><i className="material-icons">
						edit
</i></span><span className="delete" onClick={() => this.props.deleteRecord(record.id)}><i className="material-icons">
						delete
				</i></span></td>);
			}
			return <tr>
				{rowElements}
			</tr>
		});
	}

	prepareHeaders = () => {
		const headers = this.props.headers.map((header) => {
			return <th>{header}</th>
		})
		return <tr>
			{headers}
		</tr>
	}

	paginate = (start) => {
		this.props.clientSidePagination(start);
	}

	preparePagination = () => {
		const count = Math.ceil(this.props.totalCount / 5);
		const pageLinks = [];
		if (this.props.totalCount > 0) {
			for (let i = 1; i <= count; i++) {
				pageLinks.push(<li><a href="#" className={this.state.selectedPage === i ? 'active' : ''} onClick={() => this.paginate((i - 1) * 5)}><span>{i}</span></a></li>)
			}
		}
		return pageLinks;
	}

	render() {
		return (
			<div className="card">
				<div className="datagrid">
					<table>
						<thead>
							{this.prepareHeaders()}
						</thead>
						<tbody>
							{this.props.data.length > 0 ? this.prepareBody() : ''}
						</tbody>
						<tfoot>
							<tr>
								<td colspan="8">
									<div id="paging">
										<ul>
											{/* <li><a href="#"><span>Previous</span></a></li> */}
											{this.preparePagination()}
											{/* <li><a href="#"><span>Next</span></a></li> */}
										</ul>
									</div>
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		);
	}
}

export default DataTable;
