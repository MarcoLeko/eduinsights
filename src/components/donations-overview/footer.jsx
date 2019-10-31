import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FooterMenuList from "./footer-nav-list";
import SendIcon from "@material-ui/icons/Send";
import GuestBook from "@material-ui/icons/MenuBook";
import './footer.scss'
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

function Footer() {

        return (
            <Paper
                square={true}
                elevation={0}
                className="background-transparent footer-box">
                <Grid
                    container
                >
                    <Grid item xs={12} sm={6} md={6}
                          style={{
                              padding: '2em 0'
                          }}>
                        <Typography variant="h5" color="inherit">
                            Footer Content
                        </Typography>

                        <Typography color="inherit" variant="subtitle1">
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
                </Grid>
            </Paper>
        );
}

export default Footer;
