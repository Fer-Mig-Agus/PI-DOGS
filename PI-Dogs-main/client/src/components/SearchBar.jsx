import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../assets/styles/components/SearchBar.module.css';
import { filterSearchByName } from '../redux/actions.js';

const SearchBar = () => {

	const dispatch=useDispatch();

	const [search, setSearch] = useState('');
	const [searchBtn,setSearchBtn]=useState('');

	//para el input
	const handleValue = (event) => {
		setSearch(event.target.value);
	};

	//para el btn cuando hace click
	const handleSearch=(event)=>{
		event.preventDefault();		
		dispatch(filterSearchByName(search));
	}

	return (
		<div className={styles.content}>
			<div className={styles.search}>
				<div className={styles.searchBox}>
					<div className={styles.searchField}>
						<input
							placeholder="Search..."
							onChange={handleValue}
							className={styles.input}
							type="text"
						/>

						<div className={styles.searchBoxIcon}>
							<button
								className={styles.btnIconContent}
								onClick={handleSearch}
							>
								<i className={styles.searchIcon}>
									<svg
										xmlns="://www.w3.org/2000/svg"
										version="1.1"
										viewBox="0 0 512 512"
									>
										<path
											d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
											fill="#fff"
										></path>
									</svg>
								</i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
