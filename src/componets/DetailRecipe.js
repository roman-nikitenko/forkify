import React from 'react';
import icons from '../img/icons.svg'

export const DetailRecipe = ({ recipe }) => {
  const {
    cooking_time,
    image_url,
    ingredients,
    publisher,
    servings,
    source_url,
    title
  } = recipe;

  return <>
    <figure className="recipe__fig">
      <img src={image_url} alt={title} className="recipe__img"/>
      <h1 className="recipe__title">
        <span>{title}</span>
      </h1>
    </figure>

    <div className="recipe__details">
      <div className="recipe__info">
        <svg className="recipe__info-icon">
          <use href={`${icons}#icon-clock`}></use>
        </svg>
        <span className="recipe__info-data recipe__info-data--minutes">{cooking_time}</span>
        <span className="recipe__info-text">minutes</span>
      </div>
      <div className="recipe__info">
        <svg className="recipe__info-icon">
          <use href={`${icons}#icon-users`}></use>
        </svg>
        <span className="recipe__info-data recipe__info-data--people">{servings}</span>
        <span className="recipe__info-text">servings</span>

        <div className="recipe__info-buttons">
          <button className="btn--tiny btn--increase-servings">
            <svg>
              <use href={`${icons}#icon-minus-circle`}></use>
            </svg>
          </button>
          <button className="btn--tiny btn--increase-servings">
            <svg>
              <use href={`${icons}#icon-plus-circle`}></use>
            </svg>
          </button>
        </div>
      </div>

      <div className="recipe__user-generated">
        <svg>
          <use href={`${icons}#icon-user`}></use>
        </svg>
      </div>
      <button className="btn--round">
        <svg className="">
          <use href={`${icons}#icon-bookmark-fill`}></use>
        </svg>
      </button>
    </div>

    <div className="recipe__ingredients">
      <h2 className="heading--2">Recipe ingredients</h2>
      <ul className="recipe__ingredient-list">

        {ingredients.map(ing => (
          <li key={ing.description} className="recipe__ingredient">
            <svg className="recipe__icon">
              <use href={`${icons}#icon-check`}></use>
            </svg>
            <div className="recipe__quantity">{ing.quantity}</div>
            <div className="recipe__description">
              <span className="recipe__unit">{ing.unit}</span>
              {ing.description}
            </div>
          </li>
        ))}

      </ul>
    </div>

    <div className="recipe__directions">
      <h2 className="heading--2">How to cook it</h2>
      <p className="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span className="recipe__publisher">{publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        className="btn--small recipe__btn"
        href={source_url}
        target="_blank"
      >
        <span>Directions</span>
        <svg className="search__icon">
          <use href={`${icons}#icon-arrow-right`}></use>
        </svg>
      </a>
    </div>
  </>
};
