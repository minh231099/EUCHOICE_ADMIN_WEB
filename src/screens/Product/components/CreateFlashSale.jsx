import React, { useEffect } from 'react';
import { Col, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import ProForm, { ProFormDateRangePicker, ProFormText } from '@ant-design/pro-form';
import ToJS from '../../../hoc/ToJS';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addUpdFS } from '../redux/action';

const CreateFlashSale = (props) => {
    const [form] = ProForm.useForm();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const onFinish = (values) => {
        let types = props.data?.type?.map((item) => {
            let id, amount, price;
            for (const [key, value] of Object.entries(values)) {
                if (key === `id_${item._id}`) {
                    id = value;
                }
                if (key === `amount_${item._id}`)
                    amount = value;
                if (key === `price_${item._id}`)
                    price = value;
            }
            return {
                _id: id,
                priceSale: price,
                amountSale: amount,
            }
        })
        dispatch(addUpdFS({
            product: props.data._id,
            startSale: values.date[0],
            endSale: values.date[1],
            type: types
        }));
    }

    const onClose = () => {
        props.onClose();
        form.resetFields();
    }

    useEffect(() => {
        form.resetFields();
        let obj = {
            date: [props.data?.startSale, props.data?.endSale]
        };
        props.data?.type?.map((item) => {
            let am = `amount_${item._id}`;
            let id = `id_${item._id}`;
            let pr = `price_${item._id}`;
            obj[am] = item.amountSale;
            obj[id] = item._id;
            obj[pr] = item.priceSale;
        })
        form.setFieldsValue(obj);
    }, [props.data]);

    return (
        <Modal
            title={!props.data?.isSale ? t('editFlashSale') : t('createNewFlashSale')}
            open={props.visible}
            onCancel={onClose}
            width={900}
            footer={false}
        >
            <div className='title-flash-sale'>
                <div><span className='title-text-fs'>{t('nameProduct')}: </span>{props.data.name}</div>
                <div><span className='title-text-fs'>{t('category')}: </span>{props.data.category}</div>
                <div><span className='title-text-fs'>{t('warehouse')}: </span>{props.data.warehouse}</div>
            </div>
            <ProForm
                form={form}
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    <Col lg={12} md={24} sm={24} xs={24}>
                        <ProFormDateRangePicker
                            label={<span className='title-text-fs'>{t("dateSale")}</span>}
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseDoNotLeaveItBlank'),
                                },
                            ]}
                        />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '5px' }}>
                    {props.data?.group1 ?
                        <Col span={7}>
                        </Col> : null}
                    <Col span={props.data?.group1 ? 8 : 12}>
                        <span className='title-text-fs tilte-sale'><span className='must-type-fs'>*</span> Price Sale</span>
                    </Col>
                    <Col span={props.data?.group1 ? 8 : 12}>
                        <span className='title-text-fs tilte-sale'><span className='must-type-fs'>*</span> Amount Sale</span>
                    </Col>
                </Row>
                {props.data?.type?.map((item) => (
                    <Row gutter={16} key={`${item._id}`}>
                        {props.data?.group1 ?
                            <Col span={7}>
                                <div className='group-flash-sale'>
                                    <div className='group-child-fs'><span className='title-text-fs'>{props.data?.group1}: </span><span className='text-fs'>{item.group1}</span></div>
                                    {props.data?.group2 ?
                                        <div className='group-child-fs'><span className='title-text-fs'>{props.data?.group2}: </span><span className='text-fs'>{item.group2}</span></div>
                                        : null}
                                </div>
                            </Col> : null}
                        <Col span={props.data?.group1 ? 8 : 12}>
                            <div style={{ display: 'none' }}>
                                <ProFormText
                                    label={false}
                                    name={`id_${item._id}`}
                                    initialValue={item._id}
                                />
                            </div>
                            <ProFormText
                                label={false}
                                name={`price_${item._id}`}
                                rules={[
                                    {
                                        required: true,
                                        message: t('pleaseDoNotLeaveItBlank'),
                                    },
                                    {
                                        pattern: /^[0-9]*$/,
                                        message: t('pleaseEnterANumber'),
                                    },
                                ]}
                                placeholder={t('pleaseEnterPriceSale')}
                            />
                        </Col>
                        <Col span={props.data?.group1 ? 8 : 12}>
                            <ProFormText
                                label={false}
                                name={`amount_${item._id}`}
                                rules={[
                                    {
                                        required: true,
                                        message: t('pleaseDoNotLeaveItBlank'),
                                    },
                                    {
                                        pattern: /^[0-9]*$/,
                                        message: t('pleaseEnterANumber'),
                                    },
                                ]}
                                placeholder={t('pleaseEnterAmountSale')}
                            />
                        </Col>
                    </Row>
                ))}
            </ProForm>
        </Modal >
    )
}

CreateFlashSale.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.any,

};

CreateFlashSale.defaultProps = {
    visible: false,
    onClose: () => { },
    data: null,
};

export default ToJS(CreateFlashSale);