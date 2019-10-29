import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Data from "../seed/seeds.json";
import _ from "lodash";

class Testing extends React.Component {
  render() {
    const data = [
      {
        name: "Tanner Linsley",
        age: 26,
        friend: {
          name: "Jason Maurer",
          age: 23
        }
      },
      {
        name: "Adrian Linsley",
        age: 26,
        friend: {
          name: "Jason Maurer",
          age: 23
        }
      }
    ];

    const columns = [
      {
        Header: "Nome/Horario:",
        accessor: "funcionario" // String-based value accessors!
      },
      {
        id: "hora7",
        Header: "7h-8h",
        accessor: s => s.setor[0].horaPeca[0]
      },
      {
        id: "hora8",
        Header: "8h-9h",
        accessor: s => s.setor[0].horaPeca[1]
      },
      {
        id: "hora9",
        Header: "9h-10h",
        accessor: s => s.setor[0].horaPeca[2]
      },
      {
        id: "hora10",
        Header: "10h-11h",
        accessor: s => s.setor[0].horaPeca[3]
      },
      {
        id: "hora11",
        Header: "11h-12h",
        accessor: s => s.setor[0].horaPeca[4]
      },
      {
        id: "hora12",
        Header: "12h-13h",
        accessor: s => s.setor[0].horaPeca[0]
      },
      {
        id: "hora13",
        Header: "13h-14h",
        accessor: s => s.setor[0].horaPeca[5]
      },
      {
        id: "hora14",
        Header: "14h-15h",
        accessor: s => s.setor[0].horaPeca[6]
      },
      {
        id: "hora15",
        Header: "15h-16h",
        accessor: s => s.setor[0].horaPeca[7]
      },
      {
        id: "hora16",
        Header: "16h-17h",
        accessor: s => s.setor[0].horaPeca[6]
      },
      {
        id: "total",
        Header: "Total:",
        accessor: s => s.setor[0].horaPeca,
        aggregate: vals => console.log(vals)
      }
      //   {
      //     Header: "Age",
      //     accessor: "age",
      //     Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      //   },
      //   {
      //     id: "friendName", // Required because our accessor is not a string
      //     Header: "Friend Name",
      //     accessor: d => d.friend.name // Custom value accessors!
      //   },
      //   {
      //     Header: props => <span>Friend Age</span>, // Custom header components!
      //     accessor: "friend.age"
      //   }
    ];

    return <ReactTable data={Data} columns={columns} />;
  }
}

export default Testing;
