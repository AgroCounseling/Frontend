import styled from 'styled-components'
import {device} from '../../device-size/DeviceSize'

export const AuthWrapper = styled.div`
    background: linear-gradient(to bottom, #BFC3CF , #ffffff );
    min-height: 100vh;
    position:relative;
    
    @media ${device.tablet} { 
       padding: 20px 0;
    }
`

export const Button = styled.button`
    width: 100%;    
    background: #5C9B48;
    border-radius: 10px;
    border: none;
    height: 38px;
    cursor: pointer;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 21px;
    
    color: #FFFFFF;
    
    
    ${(props: any) =>
    props.disabled ? `
            background: #979797;
            cursor: not-allowed !important;
        ` : `
        background: #5C9B48;
        `
};
    
    :focus{
        outline: none;
    }

`

export const Input = styled.input`
    width: 244px;
    height: 38px;

    font-size: 18px;
    padding-left: 10px;
    background: #FAFBFC;
    border: 2px solid rgba(194, 199, 208, 0.5);
    box-sizing: border-box;
    border-radius: 10px;
    margin-top:5px;
`

export const Label = styled.label`
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;

    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;

    color: rgba(33, 51, 54, 0.8);
`


export const WelcomeTitle = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;
    text-align: center;
    padding-top: 200px;
    color: rgba(33, 51, 54, 0.8);
`

export const BtnsWrapper = styled.div`
    margin-top: 80px;
    display: flex;
    justify-content: space-around;
    
    @media ${device.tablet} { 
       display: grid;
       
       &>a{
        margin: 10px 0;
       }
    }
`