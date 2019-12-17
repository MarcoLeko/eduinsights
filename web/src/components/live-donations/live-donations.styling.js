import {makeStyles} from "@material-ui/core";

const useLiveDonationsStyling = makeStyles(theme => ({
    card: {
        maxWidth: 450,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 20px -12px rgba(0,0,0,0.3)",
        marginBottom: theme.spacing(2),
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "left",
        padding: theme.spacing(3)
    },
    divider: {
        margin: theme.spacing(3, 0)
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    chip: {
        "&:not(:first-of-type)": {
            marginLeft: theme.spacing(1)
        }
    }
}));

export default useLiveDonationsStyling;