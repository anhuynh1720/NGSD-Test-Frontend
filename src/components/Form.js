import axios from "axios"
import style from "./Form.css"

const Form = (props) => {
    const url = "http://localhost:5000/"
    function exportJSONToCSV() {
        // Donwload data from database
        axios(url, { 
            params: {
                // Get value from user input
                fromDate : document.getElementById("fromDate").value, 
                toDate : document.getElementById("toDate").value,
                phoneNumber : document.getElementById("phoneNumber").value,
                inbound : document.getElementById("inbound").value,
                ringingTimeFrom : document.getElementById("ringingTimeFrom").value,
                ringingTimeTo : document.getElementById("ringingTimeTo").value,
                talkingTimeFrom : document.getElementById("talkingTimeFrom").value,
                talkingTimeTo : document.getElementById("talkingTimeTo").value,
            }}).then(res => {
                // Convert JSON to CSV
                var arr = typeof res.data !== 'object' ? JSON.parse(JSON.stringify(res.data)) : res.data;
                var str =
                `${Object.keys(arr[0])
                    .map((value) => `"${value}"`)
                    .join(',')}` + '\r\n';
                var csvContent = arr.reduce((st, next) => {
                st +=
                    `${Object.values(next)
                    .map((value) => `"${value}"`)
                    .join(',')}` + '\r\n';
                return st;
                }, str);
                var element = document.createElement('a');
                element.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
                element.target = '_blank';
                element.download = 'BaoCaoCuocGoi.csv';
                element.click();
        })
    }

    function getData() {
        // Get data from database
        axios(url, { 
        params: {
            // Get value from user input
            fromDate : document.getElementById("fromDate").value, 
            toDate : document.getElementById("toDate").value,
            phoneNumber : document.getElementById("phoneNumber").value,
            inbound : document.getElementById("inbound").value,
            ringingTimeFrom : document.getElementById("ringingTimeFrom").value,
            ringingTimeTo : document.getElementById("ringingTimeTo").value,
            talkingTimeFrom : document.getElementById("talkingTimeFrom").value,
            talkingTimeTo : document.getElementById("talkingTimeTo").value,
        }
        }).then(res => {
            props.onSubmit(res.data)
        })
    }

    return (
        <div className="form" style={style}>
            <form className="content">
                <tr>
                    <td><label className="label" for="fromDate"></label>Từ ngày</td>
                    <td><input className="box" id="fromDate" name="fromDate" placeholder="" type="datetime-local"></input></td>
                    <td><label className="label" for="toDate"></label>Đến ngày</td>
                    <td><input className="box" id="toDate" name="toDate" placeholder="" type="datetime-local"></input></td>
                </tr>

                <tr>
                    <td><label className="label" for="phoneNumber"></label>Số điện thoại</td>
                    <td><input className="box" id="phoneNumber" name="phoneNumber" placeholder="" type="text"></input></td>
                    <td><label className="label" for="inbound"></label>Chiều gọi</td>
                    <td>
                        <select className="box" id="inbound">
                            <option value="">Tất cả</option>
                            <option value="true">Gọi đến</option>
                            <option value="false">Gọi đi</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td><label className="label" for="ringingTimeFrom"></label>Thời gian đổ chuông từ</td>
                    <td><input className="box" id="ringingTimeFrom" name="ringingTimeFrom" placeholder="" type="number"></input></td>
                    <td><label className="label" for="ringingTimeTo"></label>Đến</td>
                    <td><input className="box" id="ringingTimeTo" name="ringingTimeTo" placeholder="" type="number"></input></td>
                </tr>

                <tr>
                    <td><label className="label" for="talkingTimeFrom"></label>Thời gian đàm thoại từ</td>
                    <td><input className="box" id="talkingTimeFrom" name="talkingTimeFrom" placeholder="" type="number"></input></td>
                    <td><label className="label" for="talkingTimeTo"></label>Đến</td>
                    <td><input className="box" id="talkingTimeTo" name="talkingTimeTo" placeholder="" type="number"></input></td>
                </tr>
                <input className="button" type="button" onClick={getData} value="Lọc"></input>
                <input className="button" type="button" onClick={exportJSONToCSV} value="Export"></input>
            </form>
        </div>
    )
}

export default Form;