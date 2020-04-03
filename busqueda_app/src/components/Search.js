import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';

import {
	ReactiveBase,
	DateRange,
	ResultCard,
	SelectedFilters,
	ReactiveList,
} from '@appbaseio/reactivesearch';

class Search extends Component {
    dateQuery(value) {
		let query = null;
		if (value) {
			query = [
				{
					range: {
						date_from: {
							gte: value.start,
						},
					},
				},
				{
					range: {
						date_to: {
							lte: moment(value.end).format('YYYY/MM/DD'),
						},
					},
				},
			];
		}
		return query ? { query: { bool: { must: query } } } : null;
    }
    
    render() {
		return (
			<ReactiveBase
				app="pedidos"
				url="https://search-pedidos-dev-4rtoq2jtrckjskj25rghj3t5fy.eu-west-1.es.amazonaws.com/"

			>
				<div className="row">
					<div className="col">
						<DateRange
							componentId="DateSensor"
							dataField="ACTUAL_DELIVERY_DAT"
							customQuery={this.dateQuery}
							initialMonth={new Date('2017-05-05')}
						/>
					</div>

					<div className="col">
						<SelectedFilters />
						<ReactiveList
							componentId="SearchResult"
							dataField="ORDER_ID"
							from={0}
							size={40}
							showPagination
							react={{
								and: ['DateSensor'],
							}}
							render={({ data }) => (
								<ReactiveList.ResultCardsWrapper>
									{data.map(item => (
										<ResultCard href={item.SHIPPINGPOINT_ID} key={item.id}>
											<ResultCard.Title>
												<div
													className="book-title"
													dangerouslySetInnerHTML={{
														__html: item.ORDER_ID,
													}}
												/>
											</ResultCard.Title>

											<ResultCard.Description>
												<div>
													<div>${item.ORDER_NUMBER}</div>
	    											<p>
														{item.LNF_SITE_CITY} · {item.ACTUAL_DELIVERY_DAT}{' '}
														guests
													</p>
												</div>
											</ResultCard.Description>
										</ResultCard>
									))}
								</ReactiveList.ResultCardsWrapper>
							)}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

export default Search;
