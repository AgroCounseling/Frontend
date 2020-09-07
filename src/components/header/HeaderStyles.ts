import styled from 'styled-components'


export const HeaderWrapper = styled.div`
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    z-index: 2;
    height: 63px;
    @media (max-width: 500px) {
        min-height: 63px;
    }
    background: #fff;
    padding: 0 25px ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.5);
`


export const LogoWrapper = styled.span`
    height: 35px;
    display: flex;
    align-items: center;
    
    &>span{
        font-style: normal;
        font-weight: 500;
        font-size: 22px;
        line-height: 29px;
        text-indent: 4px;
        color: #AA8B25;
    }
`
