import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Button } from 'antd';

const CustomCard = ({
    hoverable,
    hasShadow,
    clickable,
    style,
    children,
    hasDelete,
    onDelete,
    title,
    extra,
    className,
}) => (
    <Card
        extra={extra}
        title={title}
        style={{
            maxWidth: '100%',
            boxShadow: hasShadow
                ? '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                : '',
            cursor: clickable ? 'pointer' : '',
            ...style,
        }}
        className={`${hoverable ? 'custom-card-hoverable' : ''} ${className}`}
        actions={
            hasDelete
                ? [
                    <Button onClick={onDelete} key="delete">
                        <Icon type="delete" />
                    </Button>,
                ]
                : []
        }
    >
        {children}
    </Card>
);

CustomCard.propTypes = {
    hasDelete: PropTypes.bool,
};

CustomCard.defaultProps = {
    hasDelete: false,
};

export default CustomCard;
