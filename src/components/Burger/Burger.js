import React from 'react';
import styles from './Burger.module.css'; 
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'; 

const Burger = (props) => {
    // useEffect(() => {
    //     console.log("[Burger] component did update")
    // });
    let gettingIngredients = Object.keys(props.ingredients).map(
        ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_ , i) => {
                return <BurgerIngredient key={ingKey + i} type={ingKey} /> 
            })
        }
    ).reduce(
        (arr,el) => {
            return arr.concat(el);
        },[]);
    if(gettingIngredients.length === 0){
        gettingIngredients = <p>please start adding ingredients</p> 
    }
    return(
        <div className={styles.Burger}>
            <BurgerIngredient type={'bread-top'} /> 
            {gettingIngredients}
            <BurgerIngredient type={'bread-bottom'} /> 
        </div>
    );
}
export default Burger;