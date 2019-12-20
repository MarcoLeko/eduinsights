import Badge from '@material-ui/core/Badge';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      content: '""',
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

const useStyles = makeStyles(theme => ({
    verified: {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    }
}));
function UserAvatar(props) {
  const classes = useStyles();

  const {verified, style, children} = props;
  return (
      verified ?
          <VerifiedBadge>
            <Avatar className={clsx(verified && classes.verified)}style={style}>{children}</Avatar>
          </VerifiedBadge> :
          <Avatar style={style}>{children}</Avatar>
  );
}

const mapStateToProps = store => ({
  verified: store.authReducer.emailVerified,
});
export default connect(mapStateToProps)(UserAvatar);
