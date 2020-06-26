import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			'term': '',
			'location': '',
			'sortBy': 'best_match'
		};
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.sortByOptions = {
		    'Best Match': 'best_match',
		    'Highest Rated': 'rating',
			'Most Reviewed': 'review_count',
			'Distance From': 'distance'
		}
	}

	getSortByClass(sortByOption){
		if(this.state.sortBy === sortByOption)
			return 'active';
		else
			return '';
	}

	handleSortByChange(sortByOption){
		this.setState({
			'sortBy': sortByOption
		}, ()=>{
			if(this.state.term && this.state.location)
			{
				this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
			}
		});
	}

	handleTermChange(event){
		this.setState({
			'term': event.target.value
		});
	}

	handleLocationChange(event){
		this.setState({
			'location': event.target.value
		});
	}

	handleSearch(event){
		this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
		event.preventDefault();
	}

	handleEnterKeyPress(event){
			if(event.key === 'Enter')
				document.getElementById('searchButton').click();
	}		

	renderSortByOptions(){
		return Object.keys(this.sortByOptions).map(sortByOption =>{
			let sortByOptionValue = this.sortByOptions[sortByOption];
			return <li className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>
		});
	}

	render(){
		return (
			<div className="SearchBar">
			  <div className="SearchBar-sort-options">
			    <ul>
			      {this.renderSortByOptions()}
			    </ul>
			  </div>
			  <div className="SearchBar-fields">
			    <input onChange={this.handleTermChange} placeholder="Search Businesses" onKeyPress={this.handleEnterKeyPress} />
			    <input onChange={this.handleLocationChange} placeholder="Where?" onKeyPress={this.handleEnterKeyPress} />
			  </div>
			  <div className="SearchBar-submit">
			    <a id='searchButton' onClick={this.handleSearch}>Let's Go</a>
			  </div>
			</div>
		);
	}
}

export default SearchBar;