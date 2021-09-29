import React from 'react';

export default function Square(props) {
    return (
      <button className={`square square${props.value}`} onClick={props.onClick}>
        {props.value}
      </button>
    );
}