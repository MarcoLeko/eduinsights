import Badge from "@material-ui/core/Badge";
import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";

const StyledBadge = withStyles(theme => ({
    badge: {
        color: '#00b4ff',
        width: 16,
        height: 16,
        backgroundColor: theme.palette.background.paper,
        fontSize: 14,
        bottom: '10%',
        '&::after': {
            position: 'absolute',
            content: '"\u2714"',
        },
    },
}))(Badge);


function VerifiedBadge({children}) {
    return (
        <StyledBadge
            overlap="circle"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            variant="dot"
        >{children}</StyledBadge>
    );
}

function UserAvatar(props) {
    const {verified, style, children} = props;
    return (
        verified ?
            <VerifiedBadge>
                <Avatar style={style}>{children}</Avatar>
            </VerifiedBadge> :
            <Avatar style={style}>{children}</Avatar>
    )
}

const mapStateToProps = store => ({
    verified: store.authReducer.emailVerified
});
export default connect(mapStateToProps)(UserAvatar);