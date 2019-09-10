import React, {Component} from 'react';

import styles from './Input.module.css';
class Input extends Component{ 

    render(){
        let inputElement = null ;
        switch (this.props.inputType) {
            case ('input'): 
                inputElement = <input className={styles.inputElement} {...this.props} />
                break;
            case ('textarea'):
                inputElement = <textarea className={styles.inputElement} {...this.props} />
            default:
                inputElement = <input className={styles.inputElement} {...this.props} />
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