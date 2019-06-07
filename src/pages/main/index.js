import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';
export default class Main extends Component {
	/*sempre que houver uma variavel no state, o render sempre vai ficar "ouvindo" a alteração da
	variavel
	*/
	state = {
		products: [],
		productInfo: {},
		page: 1,
	}

	//componentDidMount >> excutado assim que o componente for executado
	componentDidMount(){
		this.loadProducts();
	}

	loadProducts = async ( page = 1) => { //definindo o valor padrão da page
		const response = await api.get(`/products?page=${page}`);
		//console.log(response.data.docs);

		const {docs, ...productInfo } = response.data;
		this.setState({products: docs, productInfo, page}); //atualiza os valores
	};
	prevPage = () => {
		const { page, productInfo } = this.state;

		if(page === 1) return;

		const pageNumber = page - 1;

		this.loadProducts(pageNumber);

	};

	nextPage = () => {
		//pegando valores
		const { page, productInfo } = this.state;

		if(page == productInfo.pages) return;

		const pageNumber = page + 1; //pega a próxima pag

		this.loadProducts(pageNumber);
	};

	//map para percorrer, map precisa de uma chave única >> key={product._id}
	render (){
		const { products, page, productInfo } = this.state;

		return (
		<div className="product-list">
			{products.map(product => (
				<article key={product._id}>
					<strong>{product.title}</strong>
					<p>{product.description}</p>
					<Link to={`/products/${product._id}`}>Acessar</Link>
				</article>
			))}
			<div className="actions">
				<button disabled={page == 1} onClick={this.prevPage}>Anterior</button>
				<button disabled={page == productInfo.pages} onClick={this.nextPage}>Próximo</button>
			</div>

		</div>
		)
	}
}




