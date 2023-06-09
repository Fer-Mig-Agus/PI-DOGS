import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../assets/styles/components/Pagination.module.css';
import Cards from './Cards';

const Pagination = () => {
	//Aqui traigo todos los perros, pero uso la copia
	const allDogs = useSelector((state) => state.copyDogs);

	//Estados para controlar la paginacion
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemPerPage] = useState(8);
	const [pageNumerLimit, setPageNumerLimit] = useState(8);
	const [maxPageNumerLimit, setMaxPageNumerLimit] = useState(8);
	const [minPageNumerLimit, setMinPageNumerLimit] = useState(0);

	//funcion para controlar controlar la paginacion,
	// se activa haciendo click sobre el numero
	const handleClick = (event) => {
		setCurrentPage(Number(event.target.id));
	};

	useEffect(() => {
		setMinPageNumerLimit(0);
		setCurrentPage(1);
		setItemPerPage(8);
	}, [allDogs]);

	//Este bucle for se encarga de guardar la cantidad de paginas que hay,
	//para ello se hace un calculo de la cantidad de elementos existentes y los que se mostraran
	const pages = [];
	for (let i = 1; i <= Math.ceil(allDogs.length / itemsPerPage); i++) {
		pages.push(i);
	}

	//Aqui se calcula el ultimo numero y el primero
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = allDogs.slice(indexOfFirstItem, indexOfLastItem);

	//Esta funcion renderiza los numeros para la paginacion
	const renderPageNumbers = pages.map((number) => {
		if (number < maxPageNumerLimit + 1 && number > minPageNumerLimit) {
			return (
				<li
					key={number}
					id={number}
					onClick={handleClick}
					className={currentPage == number ? styles.active : styles.normal}
				>
					{number}
				</li>
			);
		} else {
			return null;
		}
	});

	//Esta funcion es para el boton Next
	const handleNextBtn = () => {
		setCurrentPage(currentPage + 1);
		if (currentPage + 1 > maxPageNumerLimit) {
			setMaxPageNumerLimit(maxPageNumerLimit + pageNumerLimit);
			setMinPageNumerLimit(minPageNumerLimit + pageNumerLimit);
		}
	};
	//Esta funcion es para el boton Previous
	const handlePrevBtn = () => {
		setCurrentPage(currentPage - 1);
		if ((currentPage - 1) % pageNumerLimit == 0) {
			setMaxPageNumerLimit(maxPageNumerLimit - pageNumerLimit);
			setMinPageNumerLimit(minPageNumerLimit - pageNumerLimit);
		}
	};

	//Estas dos condiciones es para saber si se deben de mostrar los puntitos (...)
	let pageIncrementBtn = null;
	if (pages.length > maxPageNumerLimit) {
		pageIncrementBtn = (
			<li className={styles.puntitos} onClick={handleNextBtn}>
				&hellip;
			</li>
		);
	}
	let pageDecrementBtn = null;
	if (minPageNumerLimit >= 1) {
		pageDecrementBtn = (
			<li className={styles.puntitos} onClick={handlePrevBtn}>
				&hellip;
			</li>
		);
	}

	return (
		<div>
			{/* Esto renderiza los botones de la paginacion */}
			<ul className={styles.pageNumbers}>
				<li>
					<button
						onClick={handlePrevBtn}
						className={styles.buttonPagination}
						disabled={currentPage == pages[0] ? true : false}
					>
						Previous
					</button>
				</li>
				{pageDecrementBtn}
				{renderPageNumbers}
				{pageIncrementBtn}
				<li>
					<button
						onClick={handleNextBtn}
						className={styles.buttonPagination}
						disabled={currentPage == pages[pages.length - 1] ? true : false}
					>
						Next
					</button>
				</li>
			</ul>
			{/* Esto renderiza las tarjetas */}
			<Cards allDogs={currentItems} />
		</div>
	);
};

export default Pagination;
