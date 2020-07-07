import styled from 'styled-components'


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
`
export const FormWrapper = styled.form`
  display: flex;
  align-items: center;
`
export const QuestionWrappers = styled.div`
    margin: 25px 20px;
    border: 1px solid #98A1A3;
    border-radius: 8px;
`
export const FilterBy = styled.div`
    display: inline-block;
    margin: 15px 25px;
    font-weight: 500;
    font-size: 16px;
    line-height: 207.9%;
    color: #4D5C5E;
    text-decoration: underline;
    cursor: pointer;
`

export const AnswerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #4D5C5E;
`

export const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    
    &>span{
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 207%;
        color: #4D5B5C;
        text-decoration: none;
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