import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function CustomButton(props) {
    return (
        <Link
            key={props.id}
            to={props.to}
            style={{
                textDecoration: 'none',
            }}
        >
            <Button
                variant={'contained'}
                sx={{
                    color: 'white',
                    width: '200px',
                }}
            >
                {props.text}
            </Button>
        </Link>
    );
}

export default CustomButton;
