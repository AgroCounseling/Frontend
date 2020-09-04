import styled from 'styled-components'


export const MapsWrapper = styled.div`
    padding: 40px 40px 25px 40px;
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 1fr 2fr;
    align-items: baseline;
    background: rgba(194, 199, 208, 0.1);
    @media  (max-width: 700px) {
        grid-template-columns: 1fr 1fr 1fr 1fr 2fr;
    }
    @media  (max-width: 500px) {
        grid-template-columns: 1fr 1fr 1fr 1fr 4fr;
    }
    /* @media  (max-width: 996px) {
        
        display: flex;
        flex-direction: column;
        align-items: center;
    }  */
    &>div{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        
        font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
        font-weight: bold;
        font-size: 16px;
        line-height: 207.9%;
        color: rgba(33, 51, 54, 0.8);
        @media (max-width: 500px) { 
            font-weight: bold;
            font-size: 13px;
            line-height: 150%;
            text-align:left;
        }
        &>span{
            margin: 15px auto 0 auto;
        }
    }
`

export const DescriptionWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px 10%;
    @media (max-width: 500px) { 
            display:flex;
            flex-direction:row-reverse;
        }
`
export const Title = styled.div`
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
    margin: 0 0 15px 25px;
    font-style: normal;
    font-weight: bold;
    font-size: 33px;
    line-height: 40px;
    color: #64A928;
    @media (max-width: 500px) { 
        font-weight: 500;
font-size: 22px;
line-height: 40px;
        }
`

export const Description = styled.div`
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 170%;
    /* or 31px */
    
    
    color: #848484;
`