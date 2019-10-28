import * as React from 'react';
import Typography from "@material-ui/core/Typography";
import PaypalLogo from '../../assets/paypal-logo.png';

export default function PaypalPartnerButton() {

    return (
        <React.Fragment>
            <Typography
                variant="h6"
                align="center"
                style={{paddingTop: '3em'}}
            >
                Payments are supported by
            </Typography>
            <table
                border="0"
                cellPadding="10"
                cellSpacing="0"
                align="center">
                <tbody>
                <tr>
                    <td
                        align="center"
                    >
                    </td>
                </tr>
                <tr>
                    <td
                        align="center"
                    >
                        <img
                        src={PaypalLogo}
                        border="0"
                        alt="PayPal Logo"
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </React.Fragment>
    )
}
