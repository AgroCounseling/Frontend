import styled from 'styled-components'

export const NavBarWrapper = styled.div`
      padding: 15px 40px;
      position:relative;
      display: flex;
    &>div{
        padding: 0;
        margin: 0;
        position:relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: calc(100% - 100px);
        white-space: nowrap;
        overflow: hidden;
    }
    
`

export const NavBarElement = styled.div`
    font-weight: bold;
    font-size: 16px;
    line-height: 207.9%;
    display: flex;
    align-items: center;
    color: rgba(33, 51, 54, 0.8);
    cursor: pointer;
    white-space: nowrap;
    margin: 0 5px;
    &>img{
        display: block;
        margin-top: 5px;
        margin-left: 1px;
    }
    @media (max-width: 880px ){ 
        font-size: 14px;        
    }
`
