import React, { Component } from 'react';
import {

    InputFilter,

  } from "searchkit";
  import config from "../../config.json";

  const Input = ({
    placeholder
 
  }) => {


        return (
            <div>
                       <InputFilter
                      id={config.filters.searchboxBusiness.id}
                      title={config.filters.searchboxBusiness.title}
                      placeholder={placeholder}
                      searchOnChange={true}
                      prefixQueryFields={config.filters.searchboxBusiness.fields}
                     /> 
            </div>
        );


    }


export default Input;