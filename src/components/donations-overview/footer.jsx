import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import FooterMenuList from "./footer-nav-list";
import SendIcon from "@material-ui/icons/Send";
import GuestBook from "@material-ui/icons/MenuBook";

const NavItems = [
    {
        icon: <GuestBook />,
        name: "Guest-book"
    },
    {
        icon: <SendIcon />,
        name: "Mail"
    },
];

const styles = theme => ({
    flex: {
        flexGrow: 1
    },
    footer: {
        marginTop: '2em',
        textAlign: "center",
        backgroundColor: '#f5f5f5',
        left: 0,
        bottom: 0,
        right: 0,
    }
});

function Footer(props) {

        const { classes } = props;

        return (
            <Paper
                square={true}
                elevation={1}
                className={classes.footer}>
                <Grid
                    container
                >
                    <Grid item xs={12} sm={6} md={6}
                          style={{
                              padding: '2em 0'
                          }}>
                        <Typography variant="subheading" color="inherit">
                            Footer Content
                        </Typography>

                        <Typography color="inherit" variant="displayBlock">
                            You can use rows and columns of Material-UI Grid here to organize
                            your footer content.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}
                          style={{
                              padding: '2em 0'
                          }}>
                        <FooterMenuList navItems={NavItems} />
                    </Grid>

                    <Divider />

                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography
                                variant="caption"
                                color="inherit"
                                className={classes.flex}
                            >
                                Terms and Conditions
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Paper>
        );
}

export default withStyles(styles)(Footer);
