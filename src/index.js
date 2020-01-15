import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable react/prefer-stateless-function */
class InfiniteScroller extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { scrolledElement } = this.props;
    if (typeof scrolledElement === 'string') {
      this.scrolledElement = document.getElementById(scrolledElement);
    } else {
      this.scrolledElement = window;
    }
    this.attachEventListener();
  }
  componentWillReceiveProps() {
    this.attachEventListener();
  }
  componentWillUnmount() {
    this.detachEventListener();
  }
  handleScroll() {
    const { scrolledElement } = this;
    const { hasMore, threshold, loadMore } = this.props;
    const { firstChild } = scrolledElement;

    const scrollTop = scrolledElement.pageYOffset || scrolledElement.scrollTop;
    const offsetHeight =
      scrolledElement.innerHeight || scrolledElement.offsetHeight;
    const childOffset = firstChild
      ? firstChild.offsetHeight
      : document.body.scrollHeight;

    const offset = offsetHeight + scrollTop;
    if (hasMore && offset > childOffset - threshold) {
      this.detachEventListener();
      loadMore();
    }
  }
  detachEventListener() {
    const { scrolledElement } = this;
    scrolledElement.removeEventListener('scroll', this.handleScroll);
  }
  attachEventListener() {
    const { scrolledElement } = this;
    scrolledElement.addEventListener('scroll', this.handleScroll, false);
  }
  render() {
    const { className } = this.props;
    return (
      <div className={className || ''}>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

InfiniteScroller.propTypes = {
  scrolledElement: PropTypes.string,
  children: PropTypes.node,
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  threshold: PropTypes.number,
  className: PropTypes.string,
};
InfiniteScroller.defaultProps = {
  threshold: 140,
  hasMore: false,
  loadMore: () => {},
};
export default InfiniteScroller;

