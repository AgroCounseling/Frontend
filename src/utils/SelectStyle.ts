
export const selectStyle = {
    control: (styles: any) => ({
        ...styles,
        // minWidth: '200px',
        border: 'none',
        borderRadius: '10px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        background: 'rgba(194, 199, 208, 0.4)',
        fontSize: '13px'
    }),
    option: (styles: any) => {
        return {
            ...styles,
            // fontSize: '18px',
            // lineHeight: '150%',
            // height: '24px',
            // margin: 0,
            // padding: '0 5px',
        }
    }
};