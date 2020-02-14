import React = require('react');
import ReactDOM = require('react-dom');

/*
 *        Silk Carousel Utilities
 *                        v 3.0.0
 *              <> by dy55 with Love
 *  (c) 2020 dy55
 *  License under MIT
 */

export const $$silk = {
    classNames: {
        progressBar: {
            outer: "silk-progress-bar",
            inner: "silk-progress-bar-inner"
        }
    }
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
