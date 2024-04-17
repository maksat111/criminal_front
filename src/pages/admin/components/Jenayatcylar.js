import { React, useEffect, useState } from "react";
import { DatePicker, Modal, message, Input, Upload } from "antd";
import { AiOutlineDelete, AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import dayjs from "dayjs";
import date from "date-and-time";
import { axiosInstance } from "../../../config/axios";
import TableComponent from "../../../components/TableComponent";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function Jenayatcylar() {
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
  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreviewCancel = () => setPreviewOpen(false);

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    file.preview = await getBase64(file.originFileObj);
    setPreviewImage(file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };

  const showModal = (item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await axiosInstance.delete(`jenayatcy/delete/${selectedItem._id}`);
      const newDataSource = dataSource.filter(
        (element) => element._id !== selectedItem._id
      );
      setDataSource(newDataSource);
      message.success("Üstünlikli pozuldy!");
      setSelectedItem(null);
      setOpen(false);
      setConfirmLoading(false);
    } catch (err) {
      setConfirmLoading(false);
      message.error("Ýalnyşlyk ýüze çykdy, gaýtadan synanşyp görüň!");
      console.log(err);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    axiosInstance
      .get("jenayatcy/list")
      .then((res) => {
        res.data.data.forEach((element) => {
          element.key = element._id;
        });
        setDataSource(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: "Suraty",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          className="jenayatkar_surat"
          src={record?.image1}
          alt="Image doesn't exist"
        />
      ),
    },
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
      title: "Atasynyň ady",
      dataIndex: "father_name",
      key: "father_name",
    },
    {
      title: "Doglan wagty",
      dataIndex: "birthday",
      key: "birthday",
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
    if (fileList.length == 4) {
      formData.append(
        "image1",
        fileList[0].originFileObj,
        fileList[0].originFileObj.name
      );
      formData.append(
        "image2",
        fileList[1].originFileObj,
        fileList[1].originFileObj.name
      );
      formData.append(
        "image3",
        fileList[2].originFileObj,
        fileList[2].originFileObj.name
      );
      formData.append(
        "image4",
        fileList[3].originFileObj,
        fileList[3].originFileObj.name
      );
    }

    if (newItem.image1) {
      delete newItem.image1;
    }
    if (newItem.image2) {
      delete newItem.image2;
    }
    if (newItem.image3) {
      delete newItem.image3;
    }
    if (newItem.image4) {
      delete newItem.image4;
    }

    const keys = Object.keys(newItem);
    const values = Object.values(newItem);
    keys.forEach((key, index) => {
      formData.append(key, values[index]);
    });

    try {
      if (newItem._id) {
        const res = await axiosInstance.patch(
          `jenayatcy/update/${newItem._id}`,
          formData
        );
        const index = dataSource.findIndex((item) => item._id == newItem._id);
        setDataSource((previousState) => {
          const a = previousState;
          a[index].image1 = newItem.image1;
          a[index].image2 = newItem.image2;
          a[index].image3 = newItem.image3;
          a[index].image4 = newItem.image4;
          a[index].name = newItem.name;
          a[index].surname = newItem.surname;
          a[index].father_name = newItem.father_name;
          a[index].birthday = newItem.birthday;
          a[index].birth_place = newItem.birth_place;
          a[index].passport_number = newItem.passport_number;
          a[index].hasapda_yeri = newItem.hasapda_yeri;
          a[index].saklanyan_yeri = newItem.saklanyan_yeri;
          a[index].jenayaty = newItem.jenayaty;
          a[index].ayratyn_alamaty = newItem.ayratyn_alamaty;
          a[index].yakyn_hossary = newItem.yakyn_hossary;
          a[index].baslan_wagty = newItem.baslan_wagty;
          a[index].bosamaly_wagty = newItem.bosamaly_wagty;
          a[index].hasiyetnamasy = newItem.hasiyetnamasy;
          return a;
        });
      } else {
        const res = await axiosInstance.post("jenayatcy/create", formData);
        newItem._id = res.data.data?._id;
        newItem.key = res.data.data?._id;
        setDataSource([...dataSource, res.data.data]);
      }
      setConfirmLoading(false);
      setNewItem(null);
      setFileList([]);
      message.success("Üstünlikli!");
      setAddOpen(false);
    } catch (err) {
      setConfirmLoading(false);
      message.error("Gaýtadan synansyň!");
      console.log(err);
    }
  };

  const handleAddCancel = () => {
    setFileList([]);
    setAddOpen(false);
    setNewItem(null);
  };

  const handleAddChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: [e.target.value] });
  };

  const handleAddCustomRequest = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const config = {
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    try {
      onSuccess("Ok");
    } catch (err) {
      onError("Upload error");
    }
  };

  const uploadButton = (
    <div className="centeredContainer">
      <AiOutlinePlus />
      <div
        style={{
          marginTop: 5,
        }}
      >
        {newItem?._id ? "Edit" : "Upload"}
      </div>
    </div>
  );

  const handleMediaImagesShowDelete = async (e) => {
    console.log(e);
    const deleted = await axiosInstance
      .delete(
        `jenayatcy/file/delete?file=${e.image}&id=${newItem._id}&field=${e.field}`
      )
      .then((res) => {
        setNewItem({ ...newItem, [e.field]: null });
        e.field == "image1" &&
          setDataSource((previousState) => {
            let a = previousState;
            const index = a.findIndex((item) => (item._id = newItem?._id));
            a[index].image1 = null;
            return a;
          });
        e.field == "image2" &&
          setDataSource((previousState) => {
            let a = previousState;
            const index = a.findIndex((item) => (item._id = newItem?._id));
            a[index].image2 = null;
            return a;
          });
        e.field == "image3" &&
          setDataSource((previousState) => {
            let a = previousState;
            const index = a.findIndex((item) => (item._id = newItem?._id));
            a[index].image3 = null;
            return a;
          });
        e.field == "image4" &&
          setDataSource((previousState) => {
            let a = previousState;
            const index = a.findIndex((item) => (item._id = newItem?._id));
            a[index].image4 = null;
            return a;
          });
      });
  };

  return (
    <>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handlePreviewCancel}
        centered
        zIndex={"1001"}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
      <Modal
        title="Giňişleýin maglumatlar"
        open={addOpen}
        onOk={handleAddOk}
        confirmLoading={confirmLoading}
        onCancel={handleAddCancel}
        cancelText={"Goýbolsun"}
        okText={"Howwa"}
        width={"740px"}
        okType={"primary"}
        centered
      >
        <div className="banner-add-container">
          <div className="add-left">
            <div className="add-picture">Suraty:</div>
            <div className="add-column">Ady:</div>
            <div className="add-column">Familiýasy:</div>
            <div className="add-column">Atasynyň ady:</div>
            <div className="add-column">Doglan wagty:</div>
            <div className="add-column">Doglan ýeri:</div>
            <div className="add-column">Passport belgisi:</div>
            <div className="add-column">Hasapda duran ýeri:</div>
            <div className="add-column">Wagtlaýyn saklanýan ýeri:</div>
            <div className="add-column">Jenaýaty:</div>
            <div className="add-column">Aýratyn alamaty:</div>
            <div className="add-column">Iň ýakyn hossary:</div>
            <div className="add-column">Hökümiň başlan wagty:</div>
            <div className="add-column">Häsiýetnamsy:</div>
            <div className="add-column">Boşamaly wagty:</div>
          </div>
          <div className="add-right">
            <div className="add-picture">
              {newItem?._id &&
                [
                  {
                    image: newItem?.image1,
                    field: "image1",
                  },
                  {
                    image: newItem?.image2,
                    field: "image2",
                  },
                  {
                    image: newItem?.image3,
                    field: "image3",
                  },
                  {
                    image: newItem?.image4,
                    field: "image4",
                  },
                ].map(
                  (item, index) =>
                    item.image && (
                      <div className="media-image-show-container" key={index}>
                        <div className="madia-image-show-hover-container">
                          <div className="media-image-show-icon-container">
                            <div className="media-show-icon">
                              <AiOutlineEye />
                            </div>
                            <div
                              className="media-show-icon"
                              onClick={() => handleMediaImagesShowDelete(item)}
                            >
                              <AiOutlineDelete />
                            </div>
                          </div>
                          <img src={item.image} alt="main_image" />
                        </div>
                      </div>
                    )
                )}
              <Upload
                customRequest={handleAddCustomRequest}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length < 4 && uploadButton}
              </Upload>
            </div>
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
                name="father_name"
                placeholder="Atasynyň ady"
                value={newItem?.father_name}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="birthday"
                placeholder="Doglan wagty"
                value={newItem?.birthday}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="birth_place"
                placeholder="Doglan ýeri"
                value={newItem?.birth_place}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="passport_number"
                placeholder="Passport belgisi"
                value={newItem?.passport_number}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="hasapda_yeri"
                placeholder="Hasapda duran ýeri"
                value={newItem?.hasapda_yeri}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="saklanyan_yeri"
                placeholder="Wagtlaýyn saklanýan ýeri"
                value={newItem?.saklanyan_yeri}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="jenayaty"
                placeholder="Jenaýaty"
                value={newItem?.jenayaty}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="ayratyn_alamaty"
                placeholder="Aýratyn alamaty"
                value={newItem?.ayratyn_alamaty}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="yakyn_hossary"
                placeholder="Iň ýakyn hossary"
                value={newItem?.yakyn_hossary}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="baslan_wagty"
                placeholder="Hökümiň başlan wagty"
                value={newItem?.baslan_wagty}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="hasiyetnamasy"
                placeholder="Häsiýetnamsy"
                value={newItem?.hasiyetnamasy}
                onChange={handleAddChange}
              />
            </div>
            <div className="add-column">
              <Input
                name="bosamaly_wagty"
                placeholder="Boşamaly wagty"
                value={newItem?.bosamaly_wagty}
                onChange={handleAddChange}
              />
            </div>
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
        okText={"Howa"}
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

export default Jenayatcylar;
