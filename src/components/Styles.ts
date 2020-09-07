import styled  from 'styled-components'
import {device} from "../device-size/DeviceSize";


export const Wrapper = styled.div`
    padding: 0 4%;
`

export const Header = styled.div`
    margin: 50px 0 15px 0;
    padding-bottom: 50px;

    font-style: normal;
    font-weight: bold;
    font-size: 33px;
    line-height: 33px;
    color: ${(props)=> props.color ? props.color  : '#64A928'};
    
    border-bottom: 2px solid #4D5C5E; 
    
     @media ${device.tablet} {
        font-size: 26px;
     }
`

export const MainButton  = styled.button`
    background: #ECBF2C;
    border-radius: 10px;
    font-size: 18px;
    line-height: 207.9%;
    display: flex;
    align-items: center;
    text-align: center;
    border: none;
    padding: 5px 40px;
    cursor: pointer;    
    color: #FFFFFF;
`

export const ArticleSearch = styled.div`
    margin-top: 2px;
    height: 25px;
    width: 100%;
    padding:  10px 0 10px 20px;
    background: #EFEFEF;
    border: none;
    font-size: 16px;
    &:focus{
        outline: none;
    }
`

export const Yellow = styled.div`
    background: #ECBF2C;
    height: 80px;
    box-shadow: 0 6px 16px rgba(176, 176, 176, 0.1);
`
export const PhonesWrapper = styled.div`
  display: grid;
  
  &>a{
    color: #0d1c2e;
        font-size: 24px;
  }
  &>div{
    display: flex;
    &>a{
    color: #0d1c2e;
    }
  }
`
export const Close = styled.div`
    position: absolute;
    top: 18px;
    right: 20px;
    cursor: pointer;
`
