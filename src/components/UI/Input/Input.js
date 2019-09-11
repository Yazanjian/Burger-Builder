import React, {Component} from 'react';

import styles from './Input.module.css';
class Input extends Component{ 

    render(){
        let inputElement = null ;
        switch (this.props.elementType) {
            case ('input'): 
                inputElement = <input className={styles.inputElement}
                                {...this.props.elementConfig}
                                value={this.props.value} 
                                onChange={this.props.change}/>
                break;
            case ('textarea'):
                inputElement = <textarea className={styles.inputElement}
                                {...this.props.elementConfig}
                                value={this.props.value}
                                onChange={this.props.change}/>
                break;
            case ('select'):
                inputElement = <select
                                    className={styles.inputElement}                                    
                                    value={this.props.value}
                                    onChange={this.props.change}>
                                {this.props.elementConfig.options.map(option => (
                                    <option key={option.value} value={option.value}> { option.displayValue } </option>
                                ))}
                                </select>
                    break;
            default:
                inputElement = <input className={styles.inputElement}
                                {...this.props.elementConfig}
                                value={this.props.value} 
                                onChange={this.props.change}/>
                break;
        }

        return(
            <div className={styles.Input}>
                <label className={styles.Labeel}> {this.props.label} </label>
                {inputElement}
            </div>
        )
    }
}

export default Input;