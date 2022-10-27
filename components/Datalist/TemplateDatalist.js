import React, { Component } from "react";
import DataList from "react-datalist-field/build";

class TemplateDatalist extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      selectedCarId: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    var data = new FormData(this.refs.form);
    for (var key of data.entries()) {
      this.setState({ selectedCarId: key[1] });
    }
  }

  render() {
    var cars = [
      { id: 1, model: "CRV", company: "Honda" },
      { id: 2, model: "Accord", company: "Honda" },
      { id: 3, model: "800", company: "Maruti" },
      { id: 4, model: "Civic", company: "Honda" },
      { id: 5, model: "Model S", company: "Tesla" },
      { id: 6, model: "Model 3", company: "Tesla" },
      { id: 7, model: "Model X", company: "Tesla" },
      { id: 8, model: "Corolla", company: "Toyota" },
      { id: 9, model: "Rav4", company: "Toyota" },
      { id: 10, model: "Camry", company: "Toyota" },
      { id: 11, model: "Innova", company: "Toyota" },
      { id: 12, model: "Yaris", company: "Toyota" },
      { id: 13, model: "Prius", company: "Toyota" },
      { id: 14, model: "Highlander", company: "Toyota" },
      { id: 15, model: "Grand Cherokee", company: "Jeep" },
      { id: 16, model: "Wrangler", company: "Jeep" },
      { id: 17, model: "Comanche", company: "Jeep" }
    ];

    return (
      <div>
        <h3>React Datalist Field</h3>
        <ul>
          <li>Show values on left and right of the datalist.</li>
          <li>Filter list by both left and right values.</li>
          <li>
            Click on `more options` for more than 10 options to view full list.
          </li>
        </ul>
        <form ref="form">
          <h3>Select Car</h3>
          <DataList
            options={cars}
            id="id"
            value1="model"
            value2="company"
            selectedIdName="selectedCar"
            selectedId=""
            onOptionChange={this.handleChange}
          />
        </form>
        <p>Selected car id : {this.state.selectedCarId}</p>
      </div>
    );
  }
}

export default TemplateDatalist;
