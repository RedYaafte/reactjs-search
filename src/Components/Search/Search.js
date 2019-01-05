import React, { Component } from 'react';
import axios from 'axios';
import SearchList from './SearchList';
import SearchDate from './SearchDate';

class Search extends Component {
  state = {
    searchData: [],
    userMail: '',
    change: 'businessName',
    date: '',
    text: '',
  };

  componentDidMount = () => {
    this.fetchSearch();
  };

  fetchDate = async () => {
    let today = new Date();
    let todayISO = today.toISOString();
    let text = '';
    let i;
    
    for (i = 0; i < 10; i++) {
      text += todayISO[i];
    }
    console.log(text);

    let searchDate = await axios.get(`http://localhost:8000/bitacora/api/?date=${text}`);
    let date = searchDate.data;
    this.setState({ date, text });
    console.log(date.length);
    console.log(date, text);
  };

  fetchNull = async () => {
    let searchRequest = await axios.get(`http://localhost:8000/bitacora/api/`);
    let searchData = searchRequest.data;
    this.setState({ searchData });
    console.log(searchData.length);
    console.log(searchData);
  };

  serviceAttention = async () => {
    let paramsString = window.location.search;
    let searchParams = new URLSearchParams(paramsString);
    let serviceAttention = searchParams.get('serviceAttention');

    let searchRequest = await axios.get(`http://localhost:8000/bitacora/api/?serviceAttention=${serviceAttention}`);
    let searchData = searchRequest.data;
    this.setState({ searchData });
  };

  userMail = async () => {
    let paramsString = window.location.search;
    let searchParams = new URLSearchParams(paramsString);
    let userMail = searchParams.get('userMail');

    let searchRequest = await axios.get(`http://localhost:8000/bitacora/api/?userMail=${userMail}`);
    let searchData = searchRequest.data;
    this.setState({ searchData });
  };

  fetchSearch = async () => {
    // Service counter
    this.fetchDate();

    let paramsString = window.location.search;
    let searchParams = new URLSearchParams(paramsString);
    let businessName = searchParams.get('businessName');
    let serviceAttention = searchParams.get('serviceAttention');
    let userMail = searchParams.get('userMail');

    if (businessName) {
      let searchRequest = await axios.get(`http://localhost:8000/bitacora/api/?businessName=${businessName}`);
      let searchData = searchRequest.data;
      this.setState({ searchData });
      console.log(searchData.length);
      console.log(searchData);
      // this.selectSearch();
    } else if (serviceAttention) {
      this.serviceAttention();
    } else if (userMail) {
      this.userMail();
    } else {
      this.fetchNull();
    }
  };

  onChangeHandler = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  };

  // Select
  selectSearch = (evt) => {
    let change = document.querySelector('#selectSearch').value;
    this.setState({ change });
    console.log(change);
  };

  render() {
    return (
      <>
        <SearchDate date={this.state.date} text={this.state.text} />
        <select name="change" id="selectSearch" onChange={this.selectSearch}>
          <option value="businessName">Razón social</option>
          <option value="serviceAttention">¿Quien atiende el servicio?</option>
          <option value="userMail">Correo</option>
        </select>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            name={this.state.change}
            onChange={this.onChangeHandler}
            value={this.state.name}
            placeholder="Buscar..." />
          <button className="btn btn-outline-success my-2 my-sm-0">Buscar</button>
        </form>
        <SearchList searchData={this.state.searchData} />
      </>
    )
  };
};

export default Search;