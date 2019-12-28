import Badge from '@material-ui/core/Badge';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const StyledBadge = withStyles({
  badge: {
    color: '#2196f3',
    right: '4%',
    bottom: '10%',
  },
})(Badge);

function VerifiedBadge({children}) {
  return (
      <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={<CheckCircleRoundedIcon style={{
            height: '.75em',
            width: '.75em',
          }}/>}
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
  );
}

const mapStateToProps = store => ({
  verified: store.authReducer.emailVerified,
});
export default connect(mapStateToProps)(UserAvatar);
