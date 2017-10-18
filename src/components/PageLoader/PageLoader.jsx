import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
    container: {
        position: 'relative',
        height: '16rem',
        width: '100%',
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
};

const PageLoader = () => (
    <div style={style.container}>
        <RefreshIndicator
            size={60}
            left={0}
            top={0}
            status="loading"
            style={style.refresh}
        />
    </div>
);

export default PageLoader;