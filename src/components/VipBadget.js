import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';


export const VipBadge = withStyles((theme) => ({
    badge: {
        // backgroundColor: '#44b700',
        color: theme.palette.primary.main,
        // boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        width: '100%',
        height: '100%',
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '100%',
            animation: '$ripple 1.5s infinite ease-in-out',
            border: '2px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.2)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(0.8)',
            opacity: 0,
        },
    },
}))(Badge);

export const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 22,
        height: 22,
        border: `1px solid ${theme.palette.background.paper}`,
        backgroundColor: theme.palette.primary.main,
        fontSize: '10px'
    }
}))(Avatar);