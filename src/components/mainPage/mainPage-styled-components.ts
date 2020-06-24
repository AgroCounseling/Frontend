import styled from 'styled-components'


export const MapsWrapper = styled.div`
    padding: 10px 40px;
    display: grid;
    // align-items: center;
    // justify-content: space-around;
    grid-template-columns: 2fr 1fr 2fr 1fr 2fr;
    align-items: baseline;
    
    &>div{
        display: grid;
        text-align: center;
        
        font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 207.9%;
        
        color: rgba(33, 51, 54, 0.8);
        
                
        &>img{
            
            margin: auto;
            
        }
    }
`
