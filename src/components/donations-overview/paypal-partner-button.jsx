import * as React from 'react';
import Typography from "@material-ui/core/Typography";
import PaypalLogo from '../../assets/paypal-logo.png';

export default function PaypalPartnerButton() {

    return (
        <div
            style={{padding: '3em 0'}}
        >
            <Typography
                variant="h6"
                align="center"
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
        </div>
    )
}
