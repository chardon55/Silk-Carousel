import React = require('react');
import ReactDOM = require('react-dom');

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
}



/** 
 *  Legacy Usage
 */
function carouselRun() {
    
}

export class SilkCarousel extends React.Component {

}

interface ProgressBarProps {
    value: number;
    min: number;
    max: number;
}

class ProgressBar extends React.Component<ProgressBarProps, {}> {

    public render(): React.ReactNode {
        const { value, min, max } = this.props;
        return (
            <div className={$$silk.classNames.progressBar.outer}>
                <div style={
                    {
                        width: `${(value - min) / (max - min) * 100}%`
                    }
                }></div>
            </div>
        );
    }
}
