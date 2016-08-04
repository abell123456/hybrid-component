import Input from './input';

import React, {
    Component
} from 'react';


class Container extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			val: 'initialval'
		};

		this.clickHander = this.clickHander.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	clickHander(e) {
		this.setState({
			val: 'clicked'
		});
	}

	onChange(newVal) {
		console.log('Input组件值被修改为： ' + newVal);
	}

	render() {
		return (
			<div>
				<Input
					ref = 'inp'
					defaultValue={this.state.val}
					onChange = {this.onChange}
				 />
				<button 
					style={{
						marginLeft: '10px',
						color: '#333',
						padding: '5px 10px',
						borderRadius: '5px',
						background: '#ddd',
						border: 'none',
						cursor: 'pointer'
					}}
					onClick={this.clickHander}
				>外部控制Input组件</button>
			</div>
		);
	}
}

export default Container;