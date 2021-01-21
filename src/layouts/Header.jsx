import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Options from 'settings/Options';
import Navigation from 'layouts/Navigation';
import * as Form from 'components/Form';
import * as InputGroup from 'components/InputGroup';
import * as GetRoute from 'utils/GetRoute';
import * as GetUtils from 'utils/GetUtils';

export default function Header(props) {

  const routeHistory = GetRoute.RouteHistory();
  const routeSearch = GetRoute.RouteSearch();
  const searchQuery = GetUtils.GetParse('query', routeSearch);
  const searchQueryLookup = searchQuery.lookup ? searchQuery.lookup : '';
  const appTitle = Options.appTitle;
  const [lookupValue, setLookupValue] = useState(searchQueryLookup);
  const handleLookupChange = (event) => {
    const { value: lookupValue } = event.target;
    setLookupValue(lookupValue);
    handleLookupPush(lookupValue);
  }
  const handleLookupSubmit = (event) => {
    event.preventDefault();
    const queryObject = { lookup: lookupValue };
    const queryObjectString = GetUtils.GetStringfy('query', queryObject);
    routeHistory.push({
      pathname: '/finder',
      search: queryObjectString,
    });
    routeHistory.go(0);
  }
  const handleLookupPush = (value) => {
    const queryObject = { lookup: value };
    const queryObjectString = GetUtils.GetStringfy('query', queryObject);
    routeHistory.push({
      search: queryObjectString,
    });
  }

  return (
    <React.Fragment>
      <header className="header navbar navbar-expand-lg navbar-light">
        <h1 className="navbar-brand">
          <Link to={{ pathname: '/' }}>
            {appTitle}
          </Link>
        </h1>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleContent" aria-controls="navbarToggleContent" aria-expanded="false" aria-label="Navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <nav className="header__nav collapse navbar-collapse" id="navbarToggleContent">
          <Navigation />
          <Form.CTForm
            formClass={'navbar-search form-inline'}
            onSubmit={handleLookupSubmit}
          >
            <InputGroup.CTInputGroupText
              controlLabel={'검색어'}
              controlType={'text'}
              placeholder={'검색어를 입력하세요.'}
              onChange={handleLookupChange}
              value={lookupValue}
              buttonClass={'btn-outline-secondary'}
              buttonType={'submit'}
              buttonLabel={'검색'}
            />
          </Form.CTForm>
        </nav>
      </header>
    </React.Fragment >
  )

}