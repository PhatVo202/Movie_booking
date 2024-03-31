import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
  notification,
} from "antd";
import { addMovieApi, editMovieApi, fetchMovieDetailApi } from "services/movie";
import { MA_NHOM } from "constants";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import moment from "moment";

export default function MovieForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [form] = useForm();
  const [file, setFile] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    if (params.id) {
      getMovieDetails();
    }
  }, [params.id]);

  const getMovieDetails = async () => {
    const result = await fetchMovieDetailApi(params.id);

    form.setFieldsValue({
      tenPhim: result.data.content.tenPhim,
      trailer: result.data.content.trailer,
      moTa: result.data.content.moTa,
      sapChieu: result.data.content.sapChieu,
      dangChieu: result.data.content.dangChieu,
      danhGia: result.data.content.danhGia,
      ngayKhoiChieu: moment(result.data.content.ngayKhoiChieu),
    });

    setImgPreview(result.data.content.hinhAnh);
  };

  const handleFinish = async (values) => {
    values.ngayKhoiChieu = values.ngayKhoiChieu.format("DD/MM/YYYY");

    const formData = new FormData();

    formData.append("tenPhim", values.tenPhim);
    formData.append("maNhom", MA_NHOM);
    formData.append("trailer", values.trailer);
    formData.append("moTa", values.moTa);
    formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
    formData.append("sapChieu", values.sapChieu);
    formData.append("dangChieu", values.dangChieu);
    formData.append("hot", values.hot);
    formData.append("danhGia", values.danhGia);
    file && formData.append("File", file, file.name);

    if (params.id) {
      formData.append("maPhim", params.id);
      await editMovieApi(formData);
    } else {
      await addMovieApi(formData);
    }

    notification.success({
      message: params.id ? "Sửa phim thành công" : "Thêm phim thành công",
    });

    navigate("/admin/films");
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event) => {
      setImgPreview(event.target.result);
    };
  };
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
        tenPhim: "",
        trailer: "",
        moTa: "",
        maNhom: "GP03",
        ngayKhoiChieu: "",
        sapChieu: true,
        dangChieu: true,
        hot: true,
        danhGia: 10,
      }}
      form={form}
      onFinish={handleFinish}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Tên phim"
        name="tenPhim"
        rules={[{ required: true, message: "Tên phim không được để trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Trailer" name="trailer">
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả" name="moTa">
        <Input />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu" name="ngayKhoiChieu">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked" name="dangChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked" name="sapChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked" name="hot">
        <Switch />
      </Form.Item>
      <Form.Item label="Số sao" name="danhGia">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Hình ảnh" onChange={handleFile}>
        <Input className="mb-3" type="file" />
        <Image src={imgPreview} width={120} height={140} />
      </Form.Item>

      <Form.Item label="Tác vụ">
        <Button htmlType="submit">Thêm phim</Button>
      </Form.Item>
    </Form>
  );
}
