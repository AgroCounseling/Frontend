import styled  from 'styled-components'


export const Wrapper = styled.div`
    padding: 0 4%;
`

export const Header = styled.div`
    margin: 50px 0 15px 0;
    padding-bottom: 50px;

    font-style: normal;
    font-weight: bold;
    font-size: 33px;
    line-height: 27px;
    color: ${(props)=> props.color ? props.color  : '#64A928'};
    
    border-bottom: 2px solid #4D5C5E; 
`

export const MainButton  = styled.button`
    background: #AA8B25;
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

export const ArticleSearch = styled.input`
    margin-top: 2px;
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