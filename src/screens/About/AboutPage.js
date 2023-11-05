import React, { useEffect } from "react";
import AboutForm from "./components/AboutForm";
import { editProfile, getProfile } from './redux/action';
import { connect } from "react-redux";
import select from '../../utils/select';
import toJs from '../../hoc/ToJS';

const AboutPage = (props) => {

    const { getProfile, editProfile, htmlString } = props;

    useEffect(() => {
        getProfile();
    }, []);

    const onSave = (htmlString) => {
        editProfile(htmlString);
    }

    return (
        <div>
            <AboutForm onClickSave={onSave} inititalValue={htmlString} />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        htmlString: select(state, 'aboutReducer', 'htmlString'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        editProfile: (htmlString) => dispatch(editProfile(htmlString)),
        getProfile: () => dispatch(getProfile()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(toJs(AboutPage));