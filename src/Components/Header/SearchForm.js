import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../Validators/WarningFieid";

const Search = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name={"search"} component={Input} placeholder={"Поиск"} />
      <button> найти </button>
    </form>
  );
}
const SearchForm = reduxForm({ form: "search-form" })(Search);

export default SearchForm;
