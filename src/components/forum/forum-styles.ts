import styled from 'styled-components'
import {device} from "../../device-size/DeviceSize";

export const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Input = styled.input`
    background: rgba(194, 199, 208, 0.4);
    border-radius: 10px;
    border: none;
    padding: 5px;
    width: 100%;
    line-height: 207%;
    font-size: 18px;
`
export const Button = styled.button`
    background: #64A928;
    border-radius: 10px;
    border: none;
    font-size: 18px;
    color: #FFFFFF;
    padding: 5px 50px;
    line-height: 207%;
    margin-left: 25px;
    white-space: nowrap;
`
export const FormWrapper = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`
export const QuestionWrappers = styled.div`
    margin: 25px 20px;
    border: 1px solid #98A1A3;
    border-radius: 8px;
`
export const AnswerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #4D5C5E;
`

export const ImageWrapper = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 80px 1fr;
    &>span{
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 207%;
        color: #4D5B5C;
        text-decoration: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        
        @media ${device.tablet} { 
          font-size: 16px;
        }
    }
`

export const Text = styled.span`
    padding: 10px;
    margin: 0 15px 0 auto;
    height: 45px;
    width: 45px;
    overflow: hidden;
    
    &>img{
      height: 100%;
      margin: 0 auto;
    }
`

export const Answers = styled.div`
    border: 1px solid #64A928;
    box-sizing: border-box;
    border-radius: 3px;
    text-align: center;
    margin-right: 15px;
    &>div{
      padding: 0 3px 3px 3px;
      color: #4D5C5E;
      border-bottom: 1px solid #98A1A3;
    }
    &>p{
      font-size: 16px;
      margin-top: -4px;
      padding: 0 3px;
      color: #4D5B5C;
    }
`

export const Search = styled.div`
    display: flex;
    justify-content: space-between;
    
    @media ${device.tablet} { 
      flex-direction: column-reverse;
      
      &>a>button{
        margin: 10px 0 !important;
        width: 100% !important;
      }
    }
`