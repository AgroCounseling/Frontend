import styled from 'styled-components'
import {device} from '../../device-size/DeviceSize'

export const NavBarWrapper = styled.div`
    padding: 15px 25px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    
`

export const NavBarElement = styled.div`
    font-weight: bold;
    font-size: 23px;
    line-height: 207.9%;
    display: flex;
    align-items: center;
    color: rgba(33, 51, 54, 0.8);
    cursor: pointer;
    &>img{
        display: block;
        margin-top: 5px;
        margin-left: 1px;
    }
    
    @media ${device.laptop} { 
        font-size: 20px;        
    }
    @media (max-width: 880px ){ 
        font-size: 16px;        
    }
`
