import { React, useEffect, useState } from "react";
import { DatePicker, Modal, message, Input } from "antd";
import dayjs from "dayjs";
import date from "date-and-time";
import { axiosInstance } from "../../../config/axios";
import TableComponent from "../../../components/TableComponent";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function Users() {
  const dateFormat = "YYYY-MM-DD";
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const today = date.format(new Date(), "YYYY-MM-DD");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [newItem, setNewItem] = useState(null);

  const showModal = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await axiosInstance.delete(`ulanyjy/delete/${selectedItem._id}`);
      const newDataSource = dataSource.filter(
        (element) => element._id !== selectedItem._id
      );
      setDataSource(newDataSource);
      message.success("Ustunlukli!");
      setSelectedItem(null);
      setOpen(false);
      setConfirmLoading(false);
    } catch (err) {
      setConfirmLoading(false);
      message.error("Ýalňyşlyk ýüze çykdy. Gaýtadan synanşyp görüň!");
      console.log(err);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    axiosInstance
      .get("ulanyjy/list")
      .then((res) => {
        res.data.data.forEach((element) => {
          element.key = element._id;
          element.createdAt = element.created_at
            ? element.created_at
            : element.createdAt;
        });
        setDataSource(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: "Ady",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Familiýasy",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Ulanyjy ady",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Status",
      dataIndex: "role",
      key: "roly",
    },
    {
      title: "Goşulan wagty",
      dataIndex: "created_at",
      key: "createdAt",
      render: (_, record) => (
        <p>{date.format(new Date(record.createdAt), "YYYY-MM-DD HH:mm:ss")}</p>
      ),
    },
    {
      title: "Pozmak",
      dataIndex: "active",
      key: "active",
      width: "110px",
      render: (_, record) => (
        <div className="delete-icon" onClick={() => showModal(record)}>
          Pozmak
        </div>
      ),
    },
    {
      title: "Üýtgetmek",
      dataIndex: "active",
      key: "active",
      width: "125px",
      render: (_, record) => (
        <div className="update-icon" onClick={() => showAddModal(record)}>
          Üýtgetmek
        </div>
      ),
    },
  ];

  //---------------------------------------------------ADD MODAL-------------------------------------------//
  const showAddModal = (item) => {
    if (item._id) {
      setNewItem(item);
      setSelectedItem(item);
    }
    setAddOpen(true);
  };

  const handleAddOk = async () => {
    setConfirmLoading(true);
    const formData = new FormData();
    const keys = Object.keys(newItem);
    const values = Object.values(newItem);
    keys.forEach((key, index) => {
      formData.append(key, values[index]);
    });
    try {
      if (newItem._id) {
        const res = await axiosInstance.patch(
          `ulanyjy/update/${newItem._id}`,
          formData
        );
        const index = dataSource.findIndex((item) => item._id == newItem._id);
        setDataSource((previousState) => {
          const a = previousState;
          a[index].name = newItem.name;
          a[index].surname = newItem.surname;
          a[index].username = newItem.username;
          a[index].role = newItem.role;
          return a;
        });
      } else {
        const res = await axiosInstance.post("ulanyjy/create", formData);
        newItem._id = res.data.data?._id;
        newItem.key = res.data.data?._id;
        newItem.createdAt = res.data.data?.createdAt;
        setDataSource([...dataSource, newItem]);
      }
      setConfirmLoading(false);
      setNewItem(null);
      message.success("Üstünlikli!");
      setAddOpen(false);
    } catch (err) {
      setConfirmLoading(false);
      message.error("Ýalňyşlyk ýüze çykdy. Gaýtadan synanşyp görüň!");
      console.log(err);
    }
  };

  const handleAddCancel = () => {
    setAddOpen(false);
    setNewItem(null);
  };

  const handleAddChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal
        title="Maglumatlary dolduryň"
        open={addOpen}
        onOk={handleAddOk}
        confirmLoading={confirmLoading}
        onCancel={handleAddCancel}
        cancelText={"Çykmak"}
        okText={"Goşmak"}
        width={"700px"}
        okType={"primary"}
        style={{ top: "150px" }}
      >
        <div className="banner-add-container">
          <div className="add-left">
            <div className="add-column">Ady:</div>
            <div className="add-column">Familiýasy:</div>
            <div className="add-column">Ulanyjy ady:</div>
            <div className="add-column">Status:</div>
            {!newItem?._id && <div className="add-column">Açar sözi:</div>}
          </div>
          <div className="add-right">
            <div className="add-column">
              <Input
                name="name"
                placeholder="Ady"
                value={newItem?.name}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="surname"
                placeholder="Familiýasy"
                value={newItem?.surname}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="username"
                placeholder="Ulanyjy ady"
                value={newItem?.username}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="role"
                placeholder="Status"
                value={newItem?.role}
                onChange={handleAddChange}
              />
            </div>
            {!newItem?._id && (
              <div className="add-column">
                <Input
                  name="password"
                  placeholder="Açar sözi"
                  value={newItem?.password}
                  onChange={handleAddChange}
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
      <Modal
        title="Siz hakykatdanam pozmakçymy?"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText={"Goýbolsun"}
        okText={"Pozmak"}
        okType={"primary"}
        okButtonProps={{ danger: true }}
        style={{
          top: "200px",
        }}
      />
      <div className="page">
        <div className="page-header-content">
          <h2> Ulanyjylar</h2>
          <div className="add-button" onClick={showAddModal}>
            Goşmak
          </div>
        </div>
        <TableComponent
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          active={selectedItem?.id}
        />
      </div>
    </>
  );
}

export default Users;
