import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { Input } from "../../Validators/WarningFieid";

const Search:React.FC<InjectedFormProps<FormDataType>> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name={"search"} component={Input} placeholder={"Поиск"} />
      <button> найти </button>
    </form>
  );
}
const SearchForm = reduxForm<FormDataType>({ form: "search-form" })(Search);

type FormDataType = {
  search: string
}
export default SearchForm;
