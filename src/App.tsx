import React from "react";
import { Provider} from "react-redux";

import ProductList from "./components/ProductList/ProductsList";
import store from "./components/redux/store";


const App = () => {
  
  return (
    <Provider store={store}>
      <div className="app__container">
        <ProductList />
      </div>
    </Provider>
  );
};

export default App;
