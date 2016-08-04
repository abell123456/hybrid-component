import React, {
    Component
} from 'react';


class App extends Component {
    static propTypes = {
        value: React.PropTypes.any
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            value: this.props.defaultValue || ''
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    get displayValue() {
        const key = 'value';
        const internalKey = 'value';

        return this.props[key] !== undefined ? this.props[key] : this.state[internalKey];
    }

    handleChange(newVal) {
        if (newVal === this.state.value) {
            return;
        }

        this.setState({
            value: newVal
        }, () => {
            this.props.onChange && this.props.onChange(newVal);
        });
    }

    componentWillReceiveProps(nextProps) {
        const controlledValue = nextProps.defaultValue;

        if (controlledValue !== undefined && controlledValue !== this.state.value) {
            this.setState({
                value: controlledValue
            }, () => {
                this.props.onChange && this.props.onChange(controlledValue);
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.value !== undefined) {
            // controlled, use `props.value`
            return nextProps.value !== this.props.value;
        }

        // uncontrolled, use `state.value`
        return nextState.value !== this.state.value;
    }

    mapPropToState(controlledValue) {
        // your can do some transformations from `props.value` to `state.value`
    }

    changeHandler(e) {
        const val = e.target.value;

        this.handleChange(val);
    }

    render() {
        return ( 
            <input 
                value = {this.displayValue} 
                onChange={this.changeHandler}
            />
        );
    }
}

export default App;