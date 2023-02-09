import {useState} from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import Form from "./components/Form"

function App() {
  const [data, setData] = useState([])

  const columns = [{
    dataField:"id",
    text:"Mã cuộc gọi"
  },
  {
    dataField:"start_time",
    text:"Thời gian",
  },
  {
    dataField:"ringing_dur",
    text:"Đổ chuông",
  },
  {
    dataField:"talking_dur",
    text:"Đàm thoại",
  },
  {
    dataField:"total_time",
    text:"Tổng thời gian cuộc gọi",
  },
  {
    dataField:"caller_number",
    text:"Người gọi",
  },
  {
    dataField:"is_inbound",
    text:"Chiều gọi"
  }]

  const getData = (data) => {
    setData(data);
  }

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Đang hiển thị { from } đến { to } của { size }
    </span>
  );

  const options = {
    showTotal: true,
    sizePerPageList: [{
      text: '10', value: 10
    }, {
      text: '25', value: 25
    }, {
      text: '50', value: 50
    } , {
      text: '100', value: 100
    }],
    paginationTotalRenderer: customTotal
  }

  return (
    <div className="App">
      <Form onSubmit = {getData}/>
      <BootstrapTable 
        keyField="call_id"
        data = {data} 
        columns = {columns}
        striped
        hover
        condensed
        pagination = {paginationFactory(options)}
        />
    </div>
  );
}

export default App;
