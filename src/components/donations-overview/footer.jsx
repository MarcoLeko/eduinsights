import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";
import './footer.scss';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import YouTubeIcon from '@material-ui/icons/YouTube';
import CodeIcon from '@material-ui/icons/Code';

const NavItems = [
    {
        icon: <SendIcon/>,
        name: "Mail"
    },
];

function Footer() {

    return (
        <Paper square={true} elevation={0} className="background footer-box">
            <Grid container>
                <Grid item xs={12} className="footer-logo-panel">
                    <Logo className="footer-logo slide-top"/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom={true}
                                className="padding-left-30 text-gradient-primary">
                        Help educate
                    </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                    <List dense={true}>
                        <ListItem disableGutters={true}>
                            <Link
                                component="button"
                                variant="button"
                                className="padding-left-30"
                            >About Us
                            </Link>
                        </ListItem>
                        <ListItem disableGutters={true}>
                            <Link
                                component="button"
                                variant="button"
                                className="padding-left-30"
                            >Terms and Conditions
                            </Link>
                        </ListItem>
                        <ListItem disableGutters={true}>
                            <Link
                                component="button"
                                variant="button"
                                className="padding-left-30"
                            >About Education
                            </Link>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={6} md={4}>
                    <List dense={true}>
                        <ListItem disableGutters={true}>
                            <Link
                                component="button"
                                variant="button"
                                className="padding-left-30"
                            ><YouTubeIcon style={{verticalAlign: 'bottom', paddingRight: '1rem'}}/>Youtube
                            </Link>
                        </ListItem>
                        <ListItem disableGutters={true}>
                            <Link
                                component="button"
                                variant="button"
                                className="padding-left-30"
                            ><CodeIcon style={{verticalAlign: 'bottom', paddingRight: '1rem'}}/>Join this Project
                            </Link>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={12} md={4} style={{display: 'flex', alignItems: 'center'}}>
                    <div className="padding-left-30"
                         style={{paddingBottom: '3em', width: '100%'}}>
                        <List dense={true} component="div" disablePadding style={{width: '100%'}}>
                            {NavItems.map((item, i) => (
                                <ListItem button key={i} disableGutters>
                                    <ListItemIcon>
                                        <Avatar>{item.icon}</Avatar>
                                    </ListItemIcon>
                                    <ListItemText inset primary={item.name}
                                                  primaryTypographyProps={{
                                                      variant: 'button',
                                                      color: "primary"
                                                  }}/>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Footer;
