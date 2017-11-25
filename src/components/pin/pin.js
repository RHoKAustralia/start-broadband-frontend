import React, { PureComponent } from 'react';

const ICON = `M56.12,0A56.12,56.12,0,0,0,0,56.12c0,31,25.12,105.12,56.12,105.12s56.12-74.13,56.12-105.12A56.12,56.12,0,0,0,56.12,0Zm0,84.61A18.22,18.22,0,1,1,74.34,66.39,18.22,18.22,0,0,1,56.12,84.61Z`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#022662',
  stroke: 'none'
};

export default class Pin extends PureComponent {

  render() {
    const {size = 20, onClick} = this.props;

    return (
      <svg height={size} viewBox='0 0 112.23 161.23'
        style={{...pinStyle, transform: `translate(${-size/2}px,${-size}px)`}}
        onClick={onClick} >
        <path d={ICON}/>
      </svg>
    );
  }
}