import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import select from '../../utils/select';
import ToJS from '../../hoc/ToJS';
import { getProductDetails, updateProduct, deleteImageProduct, uploadImageForProduct } from './redux/action';
import UpdateProductForm from './components/UpdateProductForm';

const UpdateProductPage = (props) => {
    const { id } = useParams();
    const {
        getProductDetails,
        productDetails,
        listFilterWarehouse,
        listFilterCategory,
        updateProduct,
        updateStatus,
        deleteImageProduct,
        listFilterProvider,
        uploadImageForProduct
    } = props;
    const [submiting, setSubmiting] = useState(false);

    const init = (id) => {
        getProductDetails(id);
    }

    useEffect(() => {
        init(id);
    }, [id]);

    const validationSubmit = (values, isHasGrClass) => {
        const { name, category, warehouse, price, amount } = values;
        if (!isHasGrClass) {
            if (!price) {
                return false;
            }
            if (!amount) {
                return false;
            }
        }

        if (!name) {
            return false;
        }
        if (!category) {
            return false;
        }
        if (!warehouse) {
            return false;
        }
        return true;
    }

    const convertToListType = (nameGroupClass1, nameGroupClass2, listProdClass1, listProdClass2, values, calculatorIndex) => {
        if (!nameGroupClass1) {
            return [];
        }

        let checkProdClass = true;
        listProdClass1.forEach(element => {
            if (!element) {
                checkProdClass = false;
                return false;
            }
        });
        if (!checkProdClass) return false;

        if (listProdClass2.length) {
            if (!nameGroupClass2) {
                return [];
            }

            listProdClass2.forEach(element => {
                if (!element) {
                    checkProdClass = false;
                    return false;
                }
            });
            if (!checkProdClass) return [];
        }

        const type = [];

        if (listProdClass2.length === 0) {
            listProdClass1.forEach((prodClass1, indexProdClass1) => {
                const newObj = {
                    group1: prodClass1,
                    group2: undefined,
                    price: values[`priceProd_${calculatorIndex(indexProdClass1, 0)}`],
                    amount: values[`amountProd_${calculatorIndex(indexProdClass1, 0)}`],
                };

                type.push(newObj);
            });
        }
        else {
            listProdClass1.forEach((prodClass1, indexProdClass1) => {
                listProdClass2.forEach((prodClass2, indexProdClass2) => {
                    const newObj = {
                        group1: prodClass1,
                        group2: prodClass2,
                        price: values[`priceProd_${calculatorIndex(indexProdClass1, indexProdClass2)}`],
                        amount: values[`amountProd_${calculatorIndex(indexProdClass1, indexProdClass2)}`],
                    };

                    type.push(newObj);
                })
            });
        }
        return type;
    }

    const onSubmitForm = (values, isAddNewGroup, nameGroupClass1, nameGroupClass2, listProdClass1, listProdClass2, calculatorIndex) => {
        if (validationSubmit(values, isAddNewGroup)) {
            const { name, category, warehouse, price, amount, description, material, size, volume, brand, provider, weight, image } = values;
            const type = isAddNewGroup ?
                convertToListType(nameGroupClass1, nameGroupClass2, listProdClass1, listProdClass2, values, calculatorIndex)
                :
                [{
                    price: price,
                    amount: amount,
                }];
            const productInfo = {
                group1: listProdClass1.length ? nameGroupClass1 : undefined,
                group2: listProdClass2.length ? nameGroupClass2 : undefined,
                type,
            }

            const prodBody = {
                name,
                category,
                warehouse,
                productInfo,
                description,
                material,
                size,
                volume,
                brand,
                image,
                provider,
                weight,
            }

            updateProduct(id, prodBody);
            setSubmiting(true);
        }
    }

    const onDeleteImage = (imageName) => {
        deleteImageProduct(id, imageName);
    }

    return (
        <div>
            <UpdateProductForm
                productId={id}
                productDetails={productDetails}
                onFinish={onSubmitForm}
                listFilterCategory={listFilterCategory}
                listFilterWarehouse={listFilterWarehouse}
                onClickDeleteImage={onDeleteImage}
                listFilterProvider={listFilterProvider}
                submiting={submiting}
                updateStatus={updateStatus}
                setSubmiting={setSubmiting}
                uploadImageForProduct={uploadImageForProduct}
            />
        </div>
    )
}


function mapStateToProps(state) {
    return {
        listFilterCategory: select(state, 'authReducer', 'listFilterCategory'),
        listFilterWarehouse: select(state, 'authReducer', 'listFilterWarehouse'),
        productDetails: select(state, 'productReducer', 'productDetails'),
        updateStatus: select(state, 'productReducer', 'updateStatus'),
        listFilterProvider: select(state, 'authReducer', 'listFilterProvider'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProductDetails: (id) => dispatch(getProductDetails(id)),
        updateProduct: (id, payload) => dispatch(updateProduct(id, payload)),
        deleteImageProduct: (id, imageName) => dispatch(deleteImageProduct(id, imageName)),
        uploadImageForProduct: (id, imgList) => dispatch(uploadImageForProduct(id, imgList)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToJS(UpdateProductPage));