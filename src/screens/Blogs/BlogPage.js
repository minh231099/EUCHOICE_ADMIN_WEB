import { Button } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import select from '../../utils/select';
import toJs from '../../hoc/ToJS';
import { deleteBlog, getListBlog, updateBlog } from "./redux/action";
import BlogTable from "./components/BlogTable";

const BlogPage = (props) => {
    const { listBlog, getListBlog, isFetching, pagination, deleteBlog, updateBlog } = props;
    const [refreshing, setRefreshing] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const onClickCreateNewBlog = () => {
        navigate('/blog/new');
    }

    const filterListBlog = (params, sort) => {
        const filter = {}
        const options = {
            current: params.current,
            pageSize: params.pageSize,
            sortBy: sort,
        }

        getListBlog({ filter, options });
        setRefreshing(false);
    }

    const onClickViewDetails = (id) => {
        navigate(`/blog/${id}`);
    }

    const onDeleteBlog = (id) => {
        deleteBlog(id);
        setRefreshing(true);
    }

    const onChangeHideBlog = (id, value) => {
        updateBlog(id, { hide: value });
    }

    return (
        <div>
            <BlogTable
                data={listBlog}
                loading={isFetching}
                polling={refreshing}
                pagination={pagination}
                requestFunc={filterListBlog}
                toolBarRender={() => [
                    <Button
                        key="createABlog"
                        type="primary"
                        onClick={onClickCreateNewBlog}
                    >
                        {t('createABlog')}
                    </Button>,
                ]}
                onClickViewDetails={onClickViewDetails}
                onDeleteBlog={onDeleteBlog}
                onChangeHideBlog={onChangeHideBlog}
            />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        listBlog: select(state, 'blogReducer', 'listBlog'),
        error: select(state, 'blogReducer', 'error'),
        pagination: select(state, 'blogReducer', 'pagination'),
        isFetching: select(state, 'blogReducer', 'isFetching'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getListBlog: (params) => dispatch(getListBlog(params)),
        deleteBlog: (id) => dispatch(deleteBlog(id)),
        updateBlog: (id, payload) => dispatch(updateBlog(id, payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(toJs(BlogPage));