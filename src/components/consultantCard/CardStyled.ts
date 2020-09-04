import styled from 'styled-components'

export const CardWrapper = styled.div`

    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
    background: #FFFFFF;
    border-radius: 10px;
    position: relative;
    padding-top: 45px; 
    transition: all 0.3s ease;
    
    &:hover{
      transition: all 0.3s ease;  
      box-shadow: 0 0 4px 0 rgba(0,0,0, 0.4);
    }
    &>a{
        text-decoration: none;
    }
    &>a>h2{
        white-space: nowrap;
        overflow: hidden;
        padding: 5px;
        text-overflow: ellipsis; 
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 207.9%;
        
        color: rgba(33, 51, 54, 0.8);
    }
    &>a>hr{
        background: #C4C4C4;
        border: 1px solid #C4C4C4;
    }
    &>a>p{
        text-align: left;
        padding: 5px 10px;
        height: 105px;
        @media (max-width: 500px) { 
            height: 80px;
    }
        &>span{
        font-style: italic;
        font-weight: normal;
        font-size: 14px;
        line-height: 207.9%;
        color: #64A928;
        }
    }
`

export const Ava = styled.div`
    position: absolute;
    top: -40px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    width: 80px;
    height: 80px;
    
    &>img{
        border-radius: 50px;
    }
`

export const Description = styled.div`
    height: 65px;
    @media (max-width: 500px) { 
        margin: 10px 0px;
        }
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
    margin: 35px 0;
    padding: 0 15px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 207.9%;
    text-align: center;
    color: #000000;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const Specialization = styled.span`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 207.9%;
    color: #000000 !important;
    margin-right: 5px;
`

export const ConnectButton = styled.button`
    margin-top: 15px;
    background: #64A928;
    border-radius: 0 0 10px 10px;
    color: #FFFFFF;
    border: none;
    width: 100%;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    @media (max-width: 500px) { 
        margin-top: 0;
        line-height: 220.9%;
    }
    line-height: 300.9%;
    cursor: pointer;
    position:absolute;
    left: 0;
    bottom: 0;
`

export const Star = styled.div`
    font-style: normal;
    font-weight: 200;
    font-size: 14px;
    line-height: 207.9%;
    position: absolute;
    top: 15px;
    right: 15px;
    color: rgba(33, 51, 54, 0.6);
    display: flex;
    align-items: center;
    
    &>img{
        margin-left: 5px;
    }
`
