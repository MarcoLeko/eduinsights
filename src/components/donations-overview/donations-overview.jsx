import * as React from 'react';
import {Box} from '@material-ui/core';
import Container from "@material-ui/core/Container";
import Books from '../../assets/books-image.png';
import "./donations-overview.scss";
import AllDonationsCounter from "./all-donations-counter";
import PaypalPartnerButton from "./paypal-partner-button";
import Footer from "./footer";

function DonationsOverview() {
    const [canCount, setCanCount] = React.useState(false);

    function handleImageLoad() {
        setCanCount(true);
    }

    return (
        <React.Fragment>
            <Container>
                <Box p={3}>
                    Education is a fundamental driver of personal, national and global development.
                    Investing in education is extremely important if you are a parent or even if you want to further
                    yourself professionally.
                    It is unlikely that there is ever a point in anyone’s life where learning and furthering yourself
                    becomes unimportant or unnecessary.
                    It is only through education that people are able to improve themselves. One of the most important
                    factors for escaping from poverty is education.
                    As the world evolves and becomes technologically savvy,
                    it is reasonable to expect that the demand for high-level skills will increase over time and that
                    children will need to be adequately skilled to apply for such positions. Simply completing grade 12
                    will not be sufficient for future job hunters.
                    Keep in mind that a university degree increases in value with every generation and you would want
                    your children to be part of the fortunate few that could further their education, thanks to your
                    sacrifices.
                    The option of an educational loan is always a great way to ensure that your child does not get left
                    behind the tertiary curve.
                </Box>
            </Container>

            <img className="books" src={Books} alt="Books for care" onLoad={handleImageLoad.bind(this)}/>
            <AllDonationsCounter
                canCount={canCount}
            />
            <PaypalPartnerButton />
            <Footer/>
        </React.Fragment>
    );
}

export default React.memo(DonationsOverview);
