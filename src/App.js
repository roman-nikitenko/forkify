import './App.scss';
import logo from './img/logo.png'
import { useEffect, useState } from "react";
import { getRecipe, getRecipes } from "./api/recipes";
import { DetailRecipe } from "./componets/DetailRecipe";
import icons from './img/icons.svg'
import { Spinner } from "./componets/Spinner";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [recipeId, setRecipeId] = useState(null);
  const [recipe, setRecipe] = useState({})

  const [loadRecipe, setLoadRecipe] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  }

  const clickSearch = (e) => {
    e.preventDefault();
    if (search === '') {
      return
    }

    setIsLoadData(true)
    setLoadRecipe(false);
    setRecipeId(null);
    setRecipes([]);
    setIsError(false)

    getRecipes(search)
        .then(res => {
          if (res.length === 0) {
            setIsError(true)
          }

          setIsLoadData(false);
          setRecipes(res);
        })
  }

  const getRecipeId = (id) => {
    setRecipeId(id);
    setIsSpinner(true);
    setLoadRecipe(false);
  }

  useEffect(() => {
    if (recipeId) {
      getRecipe(recipeId)
        .then(res => {
          setRecipe(res);
          setLoadRecipe(true);
          setIsSpinner(false);
        })
    }
  }, [recipeId])

  return <>
    <div className="container">
      <header className="header">
        <img src={logo} alt="Logo" className="header__logo"/>
        <form className="search">
          <input
            value={search}
            onChange={searchHandler}
            type="text"
            className="search__field"
            placeholder="Search over 1,000,000 recipes..."
          />
          <button
            className="btn search__btn"
            onClick={clickSearch}
          >
            <svg className="search__icon">
              <use href={`${icons}#icon-search`}></use>
            </svg>
            <span>Search</span>
          </button>
        </form>

        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <button className="nav__btn nav__btn--add-recipe">
                <svg className="nav__icon">
                  <use href={`${icons}#icon-edit`}></use>
                </svg>
                <span>Add recipe</span>
              </button>
            </li>
            <li className="nav__item">
              <button className="nav__btn nav__btn--bookmarks">
                <svg className="nav__icon">
                  <use href={`${icons}#icon-bookmark`}></use>
                </svg>
                <span>Bookmarks</span>
              </button>
              <div className="bookmarks">
                <ul className="bookmarks__list">
                  <div className="message">
                    <div>
                      <svg>
                        <use href={`${icons}#icon-smile`}></use>
                      </svg>
                    </div>
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                  </div>

                   <li className="preview">
                    <a className="preview__link" href="#23456">
                      <figure className="preview__fig">
                        <img src="src/img/test-1.jpg" alt="Test" />
                      </figure>
                      <div className="preview__data">
                        <h4 className="preview__name">
                          Pasta with Tomato Cream ...
                        </h4>
                        <p className="preview__publisher">The Pioneer Woman</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </header>

      <div className="search-results">
        <ul className="results">
          {isLoadData && <Spinner />}
          {isError && (
            <div className="error">
              <div>
                <svg>
                  <use href="src/img/icons.svg#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>No recipes found for your query. Please try again!</p>
            </div>
          )}
          {recipes.map(res => (
            <li key={res.id} className="preview">
              <a
                className="preview__link preview__link--active"
                href="#23456"
                onClick={() => getRecipeId(res.id)}
              >
                <figure className="preview__fig">
                  <img src={res.image_url} alt="Test"/>
                </figure>
                <div className="preview__data">
                  <h4 className="preview__title">{res.title}</h4>
                  <p className="preview__publisher">{res.publisher}</p>
                  <div className="preview__user-generated">
                    <svg>
                      <use href={`${icons}#icon-user`}></use>
                    </svg>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="pagination">
           <button className="btn--inline pagination__btn--prev">
          <svg className="search__icon">
            <use href={`${icons}#icon-arrow-left`}></use>
          </svg>
          <span>Page 1</span>
        </button>
          <button className="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg className="search__icon">
              <use href={`${icons}#icon-arrow-right`}></use>
            </svg>
          </button>
        </div>

        <p className="copyright">
          &copy; Copyright by
          <a
            className="twitter-link"
            target="_blank"
            href="https://twitter.com/jonasschmedtman"
          >Jonas Schmedtmann</a
          >. Use for learning or your portfolio. Don't use to teach. Don't claim
          as your own.
        </p>
      </div>

      <div className="recipe">
        { !recipeId && (
          <div className="message">
            <div>
              <svg>
                <use href={`${icons}#icon-smile`}></use>
              </svg>
            </div>
            <p>Start by searching for a recipe or an ingredient. Have fun!</p>
          </div>
        )}

        {isSpinner && (
          <Spinner />
        )}

        { loadRecipe && <DetailRecipe recipe={recipe} />}

      </div>
    </div>

    <div className="overlay hidden"></div>
    <div className="add-recipe-window hidden">
      <button className="btn--close-modal">&times;</button>
      <form className="upload">
        <div className="upload__column">
          <h3 className="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TEST" required name="title" type="text"/>
          <label>URL</label>
          <input value="TEST" required name="sourceUrl" type="text"/>
          <label>Image URL</label>
          <input value="TEST" required name="image" type="text"/>
          <label>Publisher</label>
          <input value="TEST" required name="publisher" type="text"/>
          <label>Prep time</label>
          <input value="23" required name="cookingTime" type="number"/>
          <label>Servings</label>
          <input value="23" required name="servings" type="number"/>
        </div>

        <div className="upload__column">
          <h3 className="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button className="btn upload__btn">
          <svg>
            <use href={`${icons}#icon-upload-cloud`}></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>
    </div>
  </>
}

export default App;
