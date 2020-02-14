"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/*
 *        Silk Carousel
 *                        v 3.0.0
 *              <> by dy55 with ❤
 *  (c) 2020 dy55
 *  License under MIT
 */
var $$silk = {
    classNames: {
        progressBar: {
            outer: "silk-progress-bar",
            inner: "silk-progress-bar-inner"
        }
    }
};
/**
 *  Legacy Usage
 */
function carouselRun() {
}
var SilkCarousel = /** @class */ (function (_super) {
    __extends(SilkCarousel, _super);
    function SilkCarousel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SilkCarousel;
}(React.Component));
exports.SilkCarousel = SilkCarousel;
var ProgressBar = /** @class */ (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressBar.prototype.render = function () {
        var _a = this.props, value = _a.value, min = _a.min, max = _a.max;
        return (React.createElement("div", { className: $$silk.classNames.progressBar.outer },
            React.createElement("div", { style: {
                    width: (value - min) / (max - min) * 100 + "%"
                } })));
    };
    return ProgressBar;
}(React.Component));
//# sourceMappingURL=silk-carousel-utils.js.map