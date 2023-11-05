import React, { Component } from "react";

import LocaleContext from "../../utils/locale";
import guid from "../../utils/guidGen";

const withLocale = (WrappedComponent) => {
  const id = guid();

  class WithLocale extends Component {
    componentDidMount() {
      const { subscribe } = this.context;
      subscribe({
        key: id,
        callback: () => this.forceUpdate(),
      });
    }

    componentWillUnmount() {
      const { unsubscribe } = this.context;
      unsubscribe(id);
    }

    render() {
      return <WrappedComponent {...this.props} locale={this.context} />;
    }
  }
  WithLocale.contextType = LocaleContext;
  return WithLocale;
};

export default withLocale;
