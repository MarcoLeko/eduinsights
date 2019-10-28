import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";

class FooterMenuList extends React.Component {
    state = { open: false };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    onItemClick = event => {
        console.log("Test");
    };

    render() {

        return (
            <List dense={true} component="div" disablePadding>
                {this.props.navItems.map((item, i) => (
                    <ListItem button onClick={this.onItemClick} key={i}>
                        <ListItemIcon>
                            <Avatar>{item.icon}</Avatar>
                        </ListItemIcon>
                        <ListItemText inset primary={item.name} />
                    </ListItem>
                ))}
            </List>
        );
    }
}

export default FooterMenuList;
