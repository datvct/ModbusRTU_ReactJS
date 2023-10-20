import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Table } from "react-bootstrap";
import "./modbus.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
function ModbusRTU() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [port, setPort] = useState("");
  const [baudrate, setBaudrate] = useState("");
  const [slave, setSlave] = useState("");
  const [poll, setPoll] = useState("");
  const [editingDevice, setEditingDevice] = useState(null);

  // thêm dữu liệu
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingDevice) {
      axios
        .put(`http://localhost:4000/modbus/${editingDevice.id}`, {
          name: name,
          type: type,
          port: port,
          baudrate: baudrate,
          slave: slave,
          poll: poll,
        })
        .then((response) => {
          const updatedData = data.map((device) => {
            if (device.id === editingDevice.id) {
              return response.data;
            }
            return device;
          });

          setData(updatedData);

          setEditingDevice(null);
          setShow(false);
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật dữ liệu:", error);
        });
    } else {
      const id = data[data.length - 1].id + 1;
      axios
        .post("http://localhost:4000/modbus", {
          id: id,
          name: name,
          type: type,
          port: port,
          baudrate: baudrate,
          slave: slave,
          poll: poll,
        })
        .then(function (response) {
          setData([...data, response.data]);
          setName("");
          setType("");
          setPort("");
          setBaudrate("");
          setSlave("");
          setPoll("");
        })
        .catch(function (error) {
          console.log(error);
        });
      setShow(false);
    }
  };
  // edit
  const handleEdit = (device) => {
    setEditingDevice(device);
    setShow(true);
  };
  // load vào modal
  useEffect(() => {
    if (editingDevice) {
      setName(editingDevice.name);
      setType(editingDevice.type);
      setPort(editingDevice.port);
      setBaudrate(editingDevice.baudrate);
      setSlave(editingDevice.slave);
      setPoll(editingDevice.poll);
    } else {
      // Đặt giá trị mặc định hoặc rỗng cho các trường khi thêm mới
      setName("");
      setType("");
      setPort("");
      setBaudrate("");
      setSlave("");
      setPoll("");
    }
  }, [editingDevice]);
  // xóa dữ liệu
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:4000/modbus/" + id)
      .then((response) => {
        const updatedData = data.filter((device) => device.id !== id);
        setData(updatedData);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ db.json:", error);
      });
  };
  // Đ
  useEffect(() => {
    axios
      .get("http://localhost:4000/modbus")
      .then((response) => setData(response.data))
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ db.json:", error);
      });
  }, []);

  return (
    <div className="main">
      <div className="add_device">
        <Button variant="primary" onClick={() => setShow(true)}>
          Add Device
        </Button>
      </div>
      <div className="list-RTU">
        <Table striped bordered hover>
          <thead className="list-title">
            <tr>
              <th>Device name</th>
              <th>Device type</th>
              <th>Port</th>
              <th>Baudrate</th>
              <th>Slave ID</th>
              <th>Poll period(ms)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((device, index) => (
              <tr key={index}>
                <td>{device.name}</td>
                <td>{device.type}</td>
                <td>{device.port}</td>
                <td>{device.baudrate}</td>
                <td>{device.slave}</td>
                <td>{device.poll}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleEdit(device);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(device.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <div className="menu-btn">
          <Button variant="primary" size="lg">
            Apply
          </Button>
          <Button variant="primary" size="lg">
            Reload
          </Button>
        </div> */}
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        animation={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" id="form" className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="name">Device Name</label>
                </div>
                <div className="col-9">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Device name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="type">Device type</label>
                </div>
                <div className="col-9">
                  <select
                    name="type"
                    id="type"
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="ES25-SW">ES25-SW</option>
                    <option value="ES-WDC-01">ES-WDC-01</option>
                    <option value="ES-SM-THEC-01">ES-SM-THEC-01</option>
                    <option value="ES-NPK-01">ES-NPK-01</option>
                    <option value="ES-RAINF-01">ES-RAINF-01</option>
                    <option value="ES-WS-02">ES-WS-02</option>
                    <option value="ES-ALS-02">ES-ALS-02</option>
                    <option value="ES-SOIL-7-IN-1">ES-SOIL-7-IN-1</option>
                    <option value="LH-IO-01">LH-IO-01</option>
                    <option value="ES-PH-WT-01">ES-PH-WT-01</option>
                    <option value="DSE7320-MKII">DSE7320-MKII</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="type">Port</label>
                </div>
                <div className="col-9">
                  <select
                    name="port"
                    id="port"
                    className="form-control"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                  >
                    <option value="/dev/ttysWK0">/dev/ttysWK0</option>
                    <option value="/dev/ttysWK1">/dev/ttysWK1</option>
                    <option value="/dev/ttysWK2">/dev/ttysWK2</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="type">Baudrate</label>
                </div>
                <div className="col-9">
                  <select
                    name="Baudrate"
                    id="baudrate"
                    className="form-control"
                    value={baudrate}
                    onChange={(e) => setBaudrate(e.target.value)}
                  >
                    <option value="9600">9600</option>
                    <option value="4800">4800</option>
                    <option value="19200">19200</option>
                    <option value="38400">38400</option>
                    <option value="115200">115200</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="slave">Modbus slave ID</label>
                </div>
                <div className="col-9">
                  <input
                    type="number"
                    name="slave"
                    id="slave"
                    placeholder="Modbus slave ID"
                    className="form-control"
                    value={slave}
                    onChange={(e) => setSlave(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="Poll">Poll period (ms) [10000-60000]</label>
                </div>
                <div className="col-9">
                  <input
                    type="number"
                    name="poll"
                    id="poll"
                    placeholder="Poll period (ms) [10000-60000]"
                    className="form-control"
                    value={poll}
                    onChange={(e) => setPoll(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            {editingDevice ? "Save" : "Add"}{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModbusRTU;
