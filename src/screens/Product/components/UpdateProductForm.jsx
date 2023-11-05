import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Anchor, Button, Card, Form, Input, Select, Space, List, InputNumber, message, Upload, Modal, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { deepCopyObj, generateKey } from "../../../utils/lib";
import { useNavigate } from "react-router";

const { Link } = Anchor;
const { Item } = Form;
const { TextArea } = Input;

const baseUrl = process.env.REACT_APP_BASE_URL;

const UpdateProductForm = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { productId, productDetails, onFinish, listFilterCategory, listFilterWarehouse, onClickDeleteImage, listFilterProvider, updateStatus, submiting, setSubmiting, uploadImageForProduct } = props;
    const [form] = useForm();

    const [isAddNewGroup, setIsAddNewGroup] = useState(false);
    const [nameGroupClass1, setNameGroupClass1] = useState(undefined);
    const [nameGroupClass2, setNameGroupClass2] = useState(undefined);
    const [listProdClass1, setListProdClass1] = useState([]);
    const [listProdClass2, setListProdClass2] = useState([]);

    const [fileList, setFileList] = useState([]);

    useMemo(() => {
        if (updateStatus === 'success' && submiting) {
            notification.open({
                message: t('updateProdSuccess'),
                type: 'success',
            });
            setSubmiting(false);
            navigate('/product');
        } else if (updateStatus === 'fail' && submiting) {
            notification.open({
                message: t('updateProdFail'),
                type: 'error',
            });
            setSubmiting(false);
        } else if (updateStatus === 'uploading' && submiting) {
            if (productId) {
                uploadImageForProduct(productId, fileList)
            }
        } else if (updateStatus === 'fail uploading' && submiting) {
            if (fileList.length) {
                notification.open({
                    message: t('addProdImgFail'),
                    type: 'error',
                });
            }
            navigate('/product');
        }
    }, [updateStatus]);

    useEffect(() => {
        clearForm();
        if (productDetails) {
            const { type, group1, group2 } = productDetails;

            if (productDetails.group1) setIsAddNewGroup(true);

            setNameGroupClass1(group1 ? group1 : undefined);
            setNameGroupClass2(group2 ? group2 : undefined);

            const listProd1 = [...new Set(type?.map(prodClass => prodClass.group1).filter((item) => item !== undefined))];
            const listProd2 = [...new Set(type?.map(prodClass => prodClass.group2).filter((item) => item !== undefined))];
            setListProdClass1(listProd1);
            setListProdClass2(listProd2);

            const defaultBody = {
                name: productDetails.name,
                category: productDetails.category?._id,
                description: productDetails.description,
                brand: productDetails.brand,
                size: productDetails.size,
                volume: productDetails.volume,
                material: productDetails.material,
                weight: productDetails.weight,
                warehouse: productDetails.warehouse?._id,
                provider: productDetails.provider?._id,
            }

            const listForm = [];

            if (group1) {
                if (group2) {
                    listProd1.forEach((_, indexProd1) => {
                        let typeIndex = 0;
                        const newObj = { innerList: [] }
                        listProd2.forEach((_, indexProd2) => {
                            defaultBody[`priceProd_${calculatorIndex(indexProd1, indexProd2)}`] = type[typeIndex].price;
                            defaultBody[`amountProd_${calculatorIndex(indexProd1, indexProd2)}`] = type[typeIndex].amount;
                            newObj.innerList.push({});
                            typeIndex += 1;
                        });
                        listForm.push(newObj);
                    });
                } else {
                    listForm[0] = { innerList: [] }
                    listProd1.forEach((_, index) => {
                        defaultBody[`priceProd_${calculatorIndex(index, 0)}`] = type[0].price;
                        defaultBody[`amountProd_${calculatorIndex(index, 0)}`] = type[0].amount;
                        listForm[0].innerList.push({});
                    });
                }
            } else {
                defaultBody.price = type?.[0]?.price;
                defaultBody.amount = type?.[0]?.amount;
            }

            defaultBody.outerList = listForm;

            if (group1) {
                listProd1.forEach((value, index) => {
                    defaultBody.outerList[0].innerList[index][`nestedInput_${index}`] = value;
                });
            }

            if (group2) {
                listProd2.forEach((value, index) => {
                    defaultBody.outerList[1].innerList[index][`nestedInput_${index}`] = value;
                });
            }

            if (productDetails.image) {
                const tmp = productDetails.image.map((img) => ({
                    uid: `-${img}`,
                    name: img,
                    status: 'done',
                    url: `${baseUrl}image/${img}`,
                    thumbUrl: `${baseUrl}image/${img}`,
                }));

                setFileList(JSON.parse(JSON.stringify(tmp)));
            }

            form.setFieldsValue(defaultBody);
        }
    }, [JSON.stringify(productDetails), form]);

    const onClickAddNewGrClass = (addOuter, fieldLen) => {
        if (fieldLen === 0) setListProdClass1(deepCopyObj(['']));
        else setListProdClass2(deepCopyObj(['']));

        setIsAddNewGroup(true);
        addOuter();
    }

    const onRemoveGrClass = (removeOuter, name, fieldLen) => {
        if (fieldLen <= 1) {
            setIsAddNewGroup(false);
            clearGrClass(1);
        }
        else {
            if (name === 0) {
                setNameGroupClass1(nameGroupClass2);
                setListProdClass1(deepCopyObj(listProdClass2));
            }
            clearGrClass(2);
        }
        removeOuter(name);
    }

    const onChangeNameGroupClass1 = (e) => {
        setNameGroupClass1(e.target.value);
    }

    const onChangeNameGroupClass2 = (e) => {
        setNameGroupClass2(e.target.value);
    }

    const onChangeListProdClass1 = (value, index) => {
        if (listProdClass1.length === index)
            listProdClass1.push(value);
        else
            listProdClass1[index] = value;
        setListProdClass1(deepCopyObj(listProdClass1));
    }

    const onChangeListProdClass2 = (value, index) => {
        if (listProdClass2.length === index)
            listProdClass2.push(value);
        else
            listProdClass2[index] = value;
        setListProdClass2(deepCopyObj(listProdClass2));
    }

    const onAddNewProdClass = (list, addnew) => {
        if (list === 1) {
            listProdClass1.push('');
            setListProdClass1(deepCopyObj(listProdClass1));
        }
        else {
            listProdClass2.push('');
            setListProdClass2(deepCopyObj(listProdClass2));
        }
        addnew();
    }

    const onDeleteProdClass = (list, remove, value) => {
        if (list === 1) {
            const newArray = listProdClass1.slice(0, value).concat(listProdClass1.slice(value + 1));
            setListProdClass1(deepCopyObj(newArray));
        }
        else {
            const newArray = listProdClass2.slice(0, value).concat(listProdClass2.slice(value + 1));
            setListProdClass2(deepCopyObj(newArray));
        }
        remove(value);
    }

    const clearGrClass = (classNum) => {
        if (classNum === 1) {
            setNameGroupClass1(undefined);
            setListProdClass1(deepCopyObj([]));
        }
        else {
            setNameGroupClass2(undefined);
            setListProdClass2(deepCopyObj([]));
        }
    }

    const calculatorIndex = (index1, index2) => {
        return `${String(index1)}_${String(index2)}`;
    }

    const clearForm = () => {
        form.resetFields();
        setIsAddNewGroup(false)
        setNameGroupClass1(undefined);
        setNameGroupClass2(undefined);
        setListProdClass1([]);
        setListProdClass2([]);
    }

    const onSubmit = (values) => {
        onFinish(values, isAddNewGroup, nameGroupClass1, nameGroupClass2, listProdClass1, listProdClass2, calculatorIndex);
        form.setFieldsValue({});
    }

    const onCancel = () => {
        navigate('/product');
        clearForm();
    }

    const [applyAllPrice, setApplyAllPrice] = useState(undefined);
    const [applyAllStock, setApplyAllStock] = useState(undefined);

    const applyToAllClass = () => {
        const currentValues = form.getFieldsValue();
        if (listProdClass2.length > 0) {
            listProdClass1.forEach((_, indexProd1) => {
                listProdClass2.forEach((_, indexProd2) => {
                    if (applyAllPrice)
                        currentValues[`priceProd_${calculatorIndex(indexProd1, indexProd2)}`] = applyAllPrice;
                    if (applyAllStock)
                        currentValues[`amountProd_${calculatorIndex(indexProd1, indexProd2)}`] = applyAllStock;
                });
            });
        } else {
            listProdClass1.forEach((_, index) => {
                if (applyAllPrice)
                    currentValues[`priceProd_${calculatorIndex(index, 0)}`] = applyAllPrice;
                if (applyAllStock)
                    currentValues[`amountProd_${calculatorIndex(index, 0)}`] = applyAllStock;
            });
        }

        form.setFieldsValue(currentValues);
    }

    const onChangeApplyAllPrice = (value) => {
        setApplyAllPrice(value);
    }

    const onChangeApplyAllStock = (value) => {
        setApplyAllStock(value);
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleBeforeUploadImage = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
            return isLt2M || Upload.LIST_IGNORE;
        }
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                let canvasSize = img.width > img.height ? img.width : img.height;
                const startDrawIn = Math.abs(img.width - img.height) / 2;

                const canvas = document.createElement('canvas');
                canvas.width = canvasSize;
                canvas.height = canvasSize;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvasSize, canvasSize);
                if (img.width > img.height) {
                    ctx.drawImage(img, 0, startDrawIn);
                } else {
                    ctx.drawImage(img, startDrawIn, 0);
                }

                canvas.toBlob((result) => resolve(result));
            };
        });
    };

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleCancelPreview = () => setPreviewOpen(false);

    const customRequest = ({ onSuccess }) => {
        onSuccess("ok");
    };

    const handleRemoveUploadImage = (file) => {
        onClickDeleteImage(file.name);
    }

    return (
        <div className="add-new-container d-flex">
            <div className="anchor-container">
                <div className='anchor-follow-screen'>
                    <Anchor className='anchor-cpn'>
                        <Link href="#basic-information" title={t('basicInformation')} />
                        <Link href="#details" title={t('details')} />
                        <Link href="#sale-infomation" title={t('salesInformation')} />
                    </Anchor>
                </div>
            </div>
            <div className='form-container'>
                <Form onFinish={onSubmit} labelWrap={true} labelCol={{ span: 6, offset: 0 }} form={form}>
                    <div id="basic-information" className='add-new-form-elm'>
                        <h2>{t('basicInformation')}</h2>
                        <div className='form-elm-body'>
                            <Item labelCol={{ span: 5 }} name='image' label={t('prodImages')} valuePropName="fileList" getValueFromEvent={normFile} required>
                                <Upload
                                    listType="picture-card"
                                    beforeUpload={handleBeforeUploadImage}
                                    fileList={fileList}
                                    defaultFileList={[...fileList]}
                                    onChange={handleChange}
                                    onPreview={handlePreview}
                                    customRequest={customRequest}
                                    maxCount={10}
                                    onRemove={handleRemoveUploadImage}
                                >
                                    {
                                        fileList.length < 10 && <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    }
                                </Upload>
                            </Item>
                            <Item labelCol={{ span: 5 }} name="name" label={t('prodName')} initialValue={name} required>
                                <Input />
                            </Item>
                            <Item labelCol={{ span: 5 }} name='category' label={t('category')} required>
                                <Select
                                    options={listFilterCategory}
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {/* <Select.Option value="demo">Demo</Select.Option> */}
                                </Select>
                            </Item>
                            <Item labelCol={{ span: 5 }} name='description' label={t('prodDes')}>
                                <TextArea autoSize={{ minRows: 8, maxRows: 25 }} />
                            </Item>
                        </div>
                    </div>
                    <div id="details" className='add-new-form-elm'>
                        <h2>{t('details')}</h2>
                        <div className='form-elm-body'>
                            <div className="d-grid">
                                <div className="grid-two-row">
                                    <div className="grid-cell">
                                        <Item name='brand' label={t('brand')}>
                                            <Input />
                                        </Item>
                                    </div>
                                    <div className="grid-cell">
                                        <Item item='material' label={t('material')}>
                                            <Input />
                                        </Item>
                                    </div>
                                </div>
                                <div className="grid-two-row">
                                    <div className="grid-cell">
                                        <Item name='size' label={t('size')}>
                                            <Input />
                                        </Item>
                                    </div>
                                    <div className="grid-cell">
                                        <Item name='volume' label={t('volume')}>
                                            <InputNumber
                                                type='number'
                                                controls={false}
                                                style={{
                                                    width: '100%'
                                                }}
                                            />
                                        </Item>
                                    </div>
                                </div>
                                <div className="grid-two-row">
                                    <div className="grid-cell">
                                        <Item name='warehouse' label={t('warehouse')} required>
                                            <Select
                                                options={listFilterWarehouse}
                                                showSearch
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }>

                                            </Select>
                                        </Item>
                                    </div>
                                    <div className="grid-cell">
                                        <Item name='provider' label={t('provider')}>
                                            <Select
                                                options={listFilterProvider}
                                                showSearch
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                            />
                                        </Item>
                                    </div>
                                </div>
                                <div className="grid-two-row">
                                    <div className="grid-cell">
                                        <Item name='weight' label={t('weight')} required>
                                            <InputNumber
                                                type='number'
                                                controls={false}
                                                style={{
                                                    width: '100%'
                                                }}
                                                addonAfter="gr"
                                            />
                                        </Item>
                                    </div>
                                    <div className="grid-cell">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="sale-infomation" className='add-new-form-elm'>
                        <h2>{t('salesInformation')}</h2>
                        <div className='form-elm-body'>
                            <Item label={t('prodClass')}>
                                <Form.List name="outerList">
                                    {(outerFields, { add: addOuter, remove: removeOuter }) => (
                                        <div>
                                            {outerFields.map((outerField, outerIndex) => (
                                                <Item key={outerField.key}>
                                                    <Card style={{ backgroundColor: '#f0f0f0' }}>
                                                        <Button
                                                            type="text"
                                                            icon={<CloseOutlined />}
                                                            onClick={() => onRemoveGrClass(removeOuter, outerField.name, outerFields.length)}
                                                            style={{ float: 'right' }}
                                                        />
                                                        <div
                                                            className='grid-two-row'
                                                        >
                                                            <Item
                                                                label={t('classGroup')}
                                                                required
                                                            >
                                                                <Input
                                                                    placeholder={`${t('classGroup')} ${outerIndex + 1}`}
                                                                    value={outerIndex === 0 ? nameGroupClass1 : nameGroupClass2}
                                                                    onChange={outerIndex === 0 ? onChangeNameGroupClass1 : onChangeNameGroupClass2}
                                                                    addonAfter={`${outerIndex === 0 ? nameGroupClass1 ? nameGroupClass1.length : 0 : nameGroupClass2 ? nameGroupClass2.length : 0}/14`}
                                                                    maxLength={14}
                                                                />
                                                            </Item>
                                                        </div>
                                                        <Item label={t('prodClass')} required>
                                                            <Form.List name={[outerField.name, 'innerList']} initialValue={['']}>
                                                                {(innerFields, { add: addInner, remove: removeInner }) => (
                                                                    <div className='grid-two-row'>
                                                                        {innerFields.map((innerField, innerIndex) => (
                                                                            <List.Item key={innerField.key}>
                                                                                <div className='d-flex prod-class-cell'>
                                                                                    <Item
                                                                                        name={[innerField.name, `nestedInput_${innerIndex}`]}
                                                                                    >
                                                                                        <Input
                                                                                            onChange={(e) => {
                                                                                                if (outerIndex === 0) onChangeListProdClass1(e.target.value, innerIndex);
                                                                                                else onChangeListProdClass2(e.target.value, innerIndex);
                                                                                            }}
                                                                                        />
                                                                                    </Item>
                                                                                    <Button
                                                                                        type="text"
                                                                                        disabled={innerFields.length === 1}
                                                                                        onClick={() => onDeleteProdClass(outerIndex === 0 ? 1 : 2, removeInner, innerField.name)}
                                                                                        icon={<DeleteOutlined className='delete-list-form-button' />}
                                                                                    />
                                                                                </div>
                                                                            </List.Item>
                                                                        ))}
                                                                        <Item>
                                                                            <Button
                                                                                type="dashed"
                                                                                onClick={() => {
                                                                                    onAddNewProdClass(outerIndex === 0 ? 1 : 2, addInner);
                                                                                }}
                                                                                icon={<PlusOutlined />}
                                                                            >
                                                                                {t('addProdClass')}
                                                                            </Button>
                                                                        </Item>
                                                                    </div>
                                                                )}
                                                            </Form.List>
                                                        </Item>
                                                    </Card>
                                                </Item>
                                            ))}
                                            {
                                                outerFields.length < 2 &&
                                                <Button type="dashed" onClick={() => onClickAddNewGrClass(addOuter, outerFields.length)} icon={<PlusOutlined />} className='add-new-class-group-button'>
                                                    {t('addClassGroup')}
                                                </Button>
                                            }
                                        </div>
                                    )}
                                </Form.List>
                            </Item>
                            {
                                !isAddNewGroup &&
                                <>
                                    <div className='grid-two-row'>
                                        <Item name='price' label={t('price')} required>
                                            <InputNumber
                                                addonBefore="đ"
                                                type='number'
                                                controls={false}
                                                style={{
                                                    width: '100%'
                                                }}
                                            />
                                        </Item>
                                    </div>
                                    <div className='grid-two-row'>
                                        <Item name='amount' label={t('warehouse')} required>
                                            <InputNumber
                                                type='number'
                                                controls={false}
                                                style={{
                                                    width: '100%'
                                                }}
                                            />
                                        </Item>
                                    </div>
                                </>
                            }
                            {
                                isAddNewGroup &&
                                <>
                                    <div className='d-flex'>
                                        <Item label={t('listOfProdClass')}>
                                            <Space.Compact>
                                                <Item
                                                    noStyle
                                                >
                                                    <InputNumber
                                                        style={{ width: '50%' }}
                                                        placeholder={t('price')}
                                                        controls={false}
                                                        type='number'
                                                        onChange={onChangeApplyAllPrice}
                                                    />
                                                </Item>
                                                <Item
                                                    noStyle
                                                >
                                                    <InputNumber
                                                        style={{ width: '50%' }}
                                                        placeholder={t('warehouse')}
                                                        controls={false}
                                                        type='number'
                                                        onChange={onChangeApplyAllStock}
                                                    />
                                                </Item>
                                                <Button className='apply-to-all-class-button' onClick={applyToAllClass}>
                                                    {t('applyToAllClass')}
                                                </Button>
                                            </Space.Compact>
                                            <div className='d-grid' style={{ marginTop: 40 }}>
                                                <div className={listProdClass2.length > 0 ? 'grid-four-row' : 'grid-three-row'}>
                                                    <div className='class-prod-class-header-cell d-flex' style={{ justifyContent: 'center' }}>
                                                        {nameGroupClass1 == undefined ? 'Nhóm Phân Loại 1' : nameGroupClass1}
                                                    </div>
                                                    {
                                                        listProdClass2.length > 0 &&
                                                        <div className='class-prod-class-header-cell d-flex' style={{ justifyContent: 'center' }}>
                                                            {nameGroupClass2 == undefined ? 'Nhóm Phân Loại 2' : nameGroupClass2}
                                                        </div>
                                                    }
                                                    <div className='class-prod-class-header-cell d-flex' style={{ justifyContent: 'center' }}>
                                                        <span style={{ color: 'red', marginLeft: -15, marginRight: 5, fontSize: 18 }}>*</span> {t('price')}
                                                    </div>
                                                    <div className='class-prod-class-header-cell d-flex' style={{ justifyContent: 'center' }}>
                                                        <span style={{ color: 'red', marginLeft: -15, marginRight: 5, fontSize: 18 }}>*</span>{t('warehouse')}
                                                    </div>
                                                </div>
                                                {
                                                    listProdClass1.map((prodClass1, class1Index) => {
                                                        const keyVal = generateKey();
                                                        return (
                                                            <div className={listProdClass2.length > 0 ? 'grid-four-row' : 'grid-three-row'} key={keyVal}>
                                                                <div className='class-prod-class-cell d-flex' style={{ justifyContent: 'center' }}>
                                                                    {prodClass1}
                                                                </div>
                                                                {
                                                                    listProdClass2.length > 0 &&
                                                                    <div className='class-prod-class-cell'>
                                                                        {
                                                                            listProdClass2.map((prodClass2) => {
                                                                                const keyVal2 = generateKey();
                                                                                return (
                                                                                    <div key={keyVal2} className='prod-class-2-value'>
                                                                                        {prodClass2}
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                }
                                                                <div className='class-prod-class-cell'>
                                                                    {
                                                                        listProdClass2.length > 0 ?
                                                                            listProdClass2.map((_, index) => {
                                                                                const keyVal2 = generateKey();
                                                                                return (
                                                                                    <div className='prod-class-2-price' key={keyVal2}>
                                                                                        <Item name={`priceProd_${calculatorIndex(class1Index, index)}`}>
                                                                                            <InputNumber
                                                                                                type='number'
                                                                                                controls={false}
                                                                                                style={{
                                                                                                    width: '100%'
                                                                                                }}
                                                                                            />
                                                                                        </Item>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                            :
                                                                            <Item name={`priceProd_${calculatorIndex(class1Index, 0)}`}>
                                                                                <InputNumber
                                                                                    type='number'
                                                                                    controls={false}
                                                                                    style={{
                                                                                        width: '100%'
                                                                                    }}
                                                                                />
                                                                            </Item>
                                                                    }
                                                                </div>
                                                                <div className='class-prod-class-cell'>
                                                                    {
                                                                        listProdClass2.length > 0 ?
                                                                            listProdClass2.map((_, index) => {
                                                                                const keyVal2 = generateKey();
                                                                                return (
                                                                                    <div className='prod-class-2-amount' key={keyVal2}>
                                                                                        <Item name={`amountProd_${calculatorIndex(class1Index, index)}`}>
                                                                                            <InputNumber
                                                                                                type='number'
                                                                                                controls={false}
                                                                                                style={{
                                                                                                    width: '100%'
                                                                                                }}
                                                                                            />
                                                                                        </Item>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                            :
                                                                            <Item name={`amountProd_${calculatorIndex(class1Index, 0)}`}>
                                                                                <InputNumber
                                                                                    type='number'
                                                                                    controls={false}
                                                                                    style={{
                                                                                        width: '100%'
                                                                                    }}
                                                                                />
                                                                            </Item>
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Item>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className='action-container'>
                        <div className='d-flex button-container' style={{ float: 'right', marginRight: 20 }}>
                            <Item>
                                <Button onClick={onCancel}>
                                    {t('cancel')}
                                </Button>
                            </Item>
                            <Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        marginLeft: 15
                                    }}
                                >
                                    {t('update')}
                                </Button>
                            </Item>
                        </div>
                    </div>
                </Form>
            </div>
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

export default UpdateProductForm;