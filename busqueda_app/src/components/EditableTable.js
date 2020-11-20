import React from "react";
import { ReactTabulator } from "react-tabulator";
import "tabulator-tables/dist/css/tabulator.min.css";

const data = [
    {
      id: 1,
      name: "Oli Bob",
      age: "12",
      color: "red",
      dob: "01/01/1980",
      rating: 5,
      passed: true,
      pets: ["cat", "dog"]
    },
    {
      id: 2,
      name: "Mary May",
      age: "1",
      color: "green",
      dob: "12/05/1989",
      rating: 4,
      passed: true,
      pets: ["cat"]
    },
    {
      id: 3,
      name: "Christine Lobowski",
      age: "42",
      color: "green",
      dob: "10/05/1985",
      rating: 4,
      passed: false
    },
    {
      id: 4,
      name: "Brendon Philips",
      age: "125",
      color: "red",
      dob: "01/08/1980",
      rating: 4.5,
      passed: true
    },
    {
      id: 5,
      name: "Margret Marmajuke",
      age: "16",
      color: "yellow",
      dob: "07/01/1999",
      rating: 4,
      passed: false
    },
    {
      id: 6,
      name: "Van Ng",
      age: "37",
      color: "green",
      dob: "06/10/1982",
      rating: 4,
      passed: true,
      pets: ["dog", "fish"]
    },
    {
      id: 7,
      name: "Duc Ng",
      age: "37",
      color: "yellow",
      dob: "10/10/1982",
      rating: 4,
      passed: true,
      pets: ["dog"]
    }
  ];
  /*<th className="header">Logon Order Number</th>
            <th className="header">Sequential Number</th>
            <th className="header">LDS Number</th>
            <th className="header">Order Status</th>
            <th className="header">Order Creation System</th>
            <th className="header">Ship-to (Destination)</th>
            <th className="header">Sold-to (Customer)</th>
            <th className="header">Bill-to (Address invoice)</th>
            <th className="header">Payer (credit check)</th>
            <th className="header">Commercial Carrier</th>
            <th className="header">Executing Carrier</th>
            <th className="header">Delivery Type</th>
            <th className="header">Process Type</th>
            <th className="header">Delivery From</th>
            <th className="header">Delivery To</th>
            <th className="header">Created By</th>
            <th className="header">On Hold</th>*/
  const columns = [
    [
      { title: "Logon Order Number", field: "orderNumber", hozAlign: "center", width: 150 },
      { title: "Sequential Number", field: "sequentialNumber", hozAlign: "center" },
      { title: "LDS Number", field: "ldsNumber", hozAlign: "center" },
      { title: "Order Status", field: "orderStatus", hozAlign: "center" },
      { title: "Order Creation System", field: "orderCreationSystem", hozAlign: "center" },      
    ]
  ];

  const options = {
    movableColumns: true
  }
  
  class EditableTable extends React.Component {
      constructor(props){
          super(props)
          this.state = {
            data: [],
            selectedName: "",
            columns: columns[0],
            icol: 0
          };
          this.ref = null;
      }
    setInfo = () => {
        console.log(this.props)
    }

    setColumns = () => {
        console.log(this.props)
      console.log(this.state.icol);
      let icol = this.state.icol === 1 ? 0 : 1;
      this.setState({ icol: icol });
      this.setState({ columns: columns[icol] });
    };
  
    setData = () => {
      this.setState({ data });
    };
  
    clearData = () => {
      this.setState({ data: [] });
    };
  
    render() {
      return (
        <div>
          <h3>
            {" "}
            <button onClick={this.setData}>Set Data</button>
            <button onClick={this.clearData}>Clear</button>
            <button onClick={this.setColumns}>Set Columns</button>
          </h3>
          <p onClick={this.setInfo}>Info</p>
          <ReactTabulator columns={this.state.columns} data={this.state.data} options={options}/>
        </div>
      );
    }
  }
  
  export default EditableTable;