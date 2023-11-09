import React, { useState } from "react";
import { Col, Image, Modal, Row, Space, Upload } from "antd";
import { useTranslation } from "react-i18next";
import { PlusOutlined, RotateLeftOutlined, RotateRightOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import ProForm, { ProFormText } from "@ant-design/pro-form";
import { useEffect } from "react";
import Item from "antd/lib/list/Item";
const baseUrl = process.env.REACT_APP_BASE_URL;

const DetailCateModal = (props) => {
    const { visible, onCancel, data, onUpdate, uploadImage } = props;
    const [form] = ProForm.useForm();
    const { t } = useTranslation();
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const handleCancelPreview = () => setPreviewOpen(false);

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(data);
        setFileList([]);
    }, [props]);

    const onFinish = async (values) => {
        onUpdate(data?._id, values)
        uploadImage(data?._id, fileList)
        onCancel()
    }
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const customRequest = ({ onSuccess }) => {
        onSuccess("ok");
    };

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
    };

    return (
        <div>
            <Modal
                title={t('detailCategory')}
                open={visible}
                destroyOnClose={true}
                maskClosable={false}
                onCancel={onCancel}
                footer={false}
            >
                {
                    data?.image ?
                        <div style={{ marginBottom: '10px' }}>
                            <Image
                                width={100}
                                src={`${baseUrl}image/${data?.image}`}
                                preview={{
                                    toolbarRender: (
                                        _,
                                        {
                                            transform: { scale },
                                            actions: { onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                                        },
                                    ) => (
                                        <Space size={12} className="toolbar-wrapper">
                                            <RotateLeftOutlined onClick={onRotateLeft} />
                                            <RotateRightOutlined onClick={onRotateRight} />
                                            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                                            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                                        </Space>
                                    ),
                                }}
                            />
                        </div>
                        : <Item
                            labelCol={{ span: 5 }}
                            name='image'
                            label={t('prodImages')}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                customRequest={customRequest}
                                listType="picture-card"
                                fileList={fileList}
                                accept=".png, .jpg, .jpge"
                                onChange={handleChange}
                                multiple={false}
                                onPreview={handlePreview}
                                maxCount={1}
                            >
                                {
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>{t('uploadBanner')}</div>
                                    </div>
                                }
                            </Upload>
                        </Item>}
                <ProForm
                    form={form}
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <ProFormText
                                label={t("name")}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: t('pleaseDoNotLeaveItBlank'),
                                    },
                                ]}
                                placeholder={t('pleaseEnterCategoryName')}
                            />
                        </Col>
                    </Row>
                </ProForm>
            </Modal>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelPreview}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </div>
    )
}

export default DetailCateModal;