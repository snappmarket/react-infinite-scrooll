'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/prefer-stateless-function */
var InfiniteScroller = function (_Component) {
  _inherits(InfiniteScroller, _Component);

  function InfiniteScroller(props) {
    _classCallCheck(this, InfiniteScroller);

    var _this = _possibleConstructorReturn(this, (InfiniteScroller.__proto__ || Object.getPrototypeOf(InfiniteScroller)).call(this, props));

    _this.handleScroll = _this.handleScroll.bind(_this);
    return _this;
  }

  _createClass(InfiniteScroller, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var scrolledElement = this.props.scrolledElement;

      if (typeof scrolledElement === 'string') {
        this.scrolledElement = document.getElementById(scrolledElement);
      } else {
        this.scrolledElement = window;
      }
      this.attachEventListener();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.attachEventListener();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.detachEventListener();
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var scrolledElement = this.scrolledElement;
      var _props = this.props,
          hasMore = _props.hasMore,
          threshold = _props.threshold,
          loadMore = _props.loadMore;
      var firstChild = scrolledElement.firstChild;


      var scrollTop = scrolledElement.pageYOffset || scrolledElement.scrollTop;
      var offsetHeight = scrolledElement.innerHeight || scrolledElement.offsetHeight;
      var childOffset = firstChild ? firstChild.offsetHeight : document.body.scrollHeight;

      var offset = offsetHeight + scrollTop;
      if (hasMore && offset > childOffset - threshold) {
        this.detachEventListener();
        loadMore();
      }
    }
  }, {
    key: 'detachEventListener',
    value: function detachEventListener() {
      var scrolledElement = this.scrolledElement;

      scrolledElement.removeEventListener('scroll', this.handleScroll);
    }
  }, {
    key: 'attachEventListener',
    value: function attachEventListener() {
      var scrolledElement = this.scrolledElement;

      scrolledElement.addEventListener('scroll', this.handleScroll, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.props.className;

      return _react2.default.createElement(
        'div',
        { className: className || '' },
        _react2.default.createElement(
          'div',
          null,
          this.props.children
        )
      );
    }
  }]);

  return InfiniteScroller;
}(_react.Component);

InfiniteScroller.propTypes = {
  scrolledElement: _propTypes2.default.string,
  children: _propTypes2.default.node,
  loadMore: _propTypes2.default.func,
  hasMore: _propTypes2.default.bool,
  threshold: _propTypes2.default.number,
  className: _propTypes2.default.string
};
InfiniteScroller.defaultProps = {
  threshold: 140,
  hasMore: false,
  loadMore: function loadMore() {}
};
exports.default = InfiniteScroller;
