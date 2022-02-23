import React from "react";
import styled from "styled-components";

const Button = ({children, onClick}) => {
    return(
        <Btn onClick={onClick}>
            <Span1></Span1>
            <Span2></Span2>
            <Span3></Span3>
            <Span4></Span4>
            {children}
        </Btn>
    )
}

const Btn = styled.button`
    margin: 20px;
    position: relative;
    display: inline-block;
    padding: 15px 30px;
    background: transparent;
    color: var(--color-lime);
    text-transform: uppercase;
    font-weight: 700;
    font-size: 24px;
    overflow: hidden;
    transition: 200ms;
    border: none;
    border-radius: 5px;

    &:hover{
        cursor: pointer;
        span:nth-child(1){
            left: 100%;
            transition: 1s;
        }
        span:nth-child(3){
            right: 100%;
            transition: 1s;
            transition-delay: 500ms;
        }
        span:nth-child(2){
            top: 100%;
            transition: 1s;
            transition-delay: 250ms;
        }
        span:nth-child(4){
            bottom: 100%;
            transition: 1s;
            transition-delay: 750ms;
        }
    }

    &:hover{
        cursor: pointer;
        background: var(--color-lime);
        color: var(--color-dark-grey);
        box-shadow: 0 0 10px var(--color-lime), 0 0 40px var(--color-lime), 0 0 80px var(--color-lime);
        transition-delay: 1s;

    }
`;
const Span1 = styled.span`
    position: absolute;
    display: block;

    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg,transparent,var(--color-lime));
`;
const Span2 = styled.span`
    position: absolute;
    display: block;

    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg,transparent,var(--color-lime));
`;
const Span3 = styled.span`
    position: absolute;
    display: block;

    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg,transparent,var(--color-lime));
`;
const Span4 = styled.span`
    position: absolute;
    display: block;

    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(260deg,transparent,var(--color-lime));
`;

export default Button;