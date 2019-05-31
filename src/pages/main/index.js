import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';
export default class Main extends Component {
	/*sempre que houver uma variavel no state, o render sempre vai ficar "ouvindo" a alteração da
	variavel
	*/
	state = {
		products: []
	}

	//componentDidMount >> excutado assim que o componente for executado
	componentDidMount(){
		this.loadProducts();
	}

	loadProducts = async () => {
		const response = await api.get('/products');

		//console.log(response.data.docs);
		this.setState({products: response.data.docs});
	};
	//map para percorrer, map precisa de uma chave única >> key={product._id}
	render (){
		const { products } = this.state;

		return (
		<div className="product-list">
			{products.map(product => (
				<article key={product._id}>
					<strong>{product.title}</strong>
					<p>{product.description}</p>
					<a href="">Acessar</a>
				</article>
			))}
		</div>
		)
	}
}




